import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedFile: File | null = null;
  recordedBlob: Blob | null = null;
  recording = false;
  mediaRecorder!: MediaRecorder;
  audioUrl: string | null = null;
  answerAudioUrl: string | null = null;
  answer: string | null = null;
  stopped = false;
  loading = false;

  private baseUrl = "https://book-knowledge-backend.onrender.com/api/v1/ask";
  private localUrl = "http://localhost:8081/api/v1/ask";

  constructor(private http: HttpClient) {}

  onPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  startRecording() {
    this.answer = null;
    this.answerAudioUrl = null;
    this.audioUrl = null;
    this.recordedBlob = null;
    this.stopped = false;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      this.mediaRecorder.ondataavailable = e => chunks.push(e.data);
      this.mediaRecorder.onstop = () => {
        this.recordedBlob = new Blob(chunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(this.recordedBlob);
        this.recording = false;
      };

      this.mediaRecorder.start();
      this.recording = true;
    });
  }

  stopRecording() {
    if (this.mediaRecorder && this.recording) {
      this.mediaRecorder.stop();
    }
  }

  cancelRecording() {
    this.recordedBlob = null;
    this.audioUrl = null;
    this.recording = false;
    this.answer = null;
    this.stopped = false;
  }

  submit() {
    if (!this.selectedFile || !this.recordedBlob) {
      alert('Please upload a PDF Book and record your question first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', this.selectedFile);
    formData.append('audio', this.recordedBlob, 'question.webm');

    this.loading = true;
    this.answer = null;
    this.answerAudioUrl = null;

    this.http.post<{ answer: string; ttsAudio: string }>(`${this.baseUrl}`, formData).subscribe({
      next: res => {
        this.answer = res.answer;
        this.answerAudioUrl = res.ttsAudio;
        this.loading = false;
        this.stopped = false;
      },
      error: err => {
        console.error(err);
        alert('Something went wrong. Please try again.');
        this.loading = false;
      }
    });
  }
}
