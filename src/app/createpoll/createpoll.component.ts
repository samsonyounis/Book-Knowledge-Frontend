import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-createpoll',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './createpoll.component.html',
  styleUrl: './createpoll.component.css'
})
export class CreatepollComponent {

  constructor(private userService: UserServiceService, private datePipe: DatePipe){}
  errorMessage ="";

  poll = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    voterId: '',
    userType: '',
    pollTitle: '',
    description: '',
    regStartDate: '',
    regEndDate: '',
    voteStartDate: '',
    voteEndDate: '',
    status: false,
  };

  onSubmit() {
      // Format date fields to match the required format
      this.poll.regStartDate = this.formatDateTime(this.poll.regStartDate);
      this.poll.regEndDate = this.formatDateTime(this.poll.regEndDate);
      this.poll.voteStartDate = this.formatDateTime(this.poll.voteStartDate);
      this.poll.voteEndDate = this.formatDateTime(this.poll.voteEndDate);
      console.log('Poll Details:', this.poll);

      this.userService.createPoll(this.poll).subscribe({
        next: (response) => {
          console.log('Poll created successfully:', response);
          this.errorMessage = response.message;
          alert('Poll created successfully!');
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error creating poll:', error);
          alert('Failed to create poll. Please try again.');
        },
      });
  }
  formatDateTime(dateTime: string): string {
    // Use Angular DatePipe to format the date
    return this.datePipe.transform(dateTime, 'yyyy-MM-dd HH:mm:ss') || '';
  }
}
