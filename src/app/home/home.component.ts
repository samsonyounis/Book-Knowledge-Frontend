import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private activatedRoute: ActivatedRoute){}

  url: string = '';

  submitUrl() {
    if (this.url) {
      console.log('Scraping URL:', this.url);
      // Call service to scrape data
    } else {
      alert('Please enter a valid URL.');
    }
  }
  ngOnInit(){

}
}
