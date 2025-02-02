import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { AdvisordashboardserviceService } from '../advisordashboardservice.service';
import { catchError, map, Observable } from 'rxjs';

@Component({
  selector: 'app-advisordashboard',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './advisordashboard.component.html',
  styleUrl: './advisordashboard.component.css'
})
export class AdvisordashboardComponent {
  constructor(private userService: UserServiceService,
              private router: Router, 
              private advisorService: AdvisordashboardserviceService){}

  selectedFeature: string = 'analytics';
  scrapeUrl: string = '';
  taxData: any[] = [];
  isLoading: boolean = false; // Loading state
  errorMessage: string | null = null;

  reports = [
    { name: '2024 Tax Analysis', date: '2024-12-31' },
    { name: 'Q4 Financial Summary', date: '2024-11-30' },
  ];
  insights = [
    'Client A has 80% of their portfolio in taxable accounts.',
    'Consider converting brokerage accounts to advisory for Client B.',
    'Client C could save $2,000 by rebalancing their portfolio.',
  ];
  clients =[
    {id: 1, clientId:"102", name: "samson", email: "sam@gmail.com",
      fundName: "American Fund", sharesOwned:500, investmentType:"Brokerage"},
    {id: 2, clientId:"104", name: "Peter", email: "peter@gmail.com",
      fundName: "American Development Fund", sharesOwned:100, investmentType:"Advisory"},
    {id: 3, clientId:"107", name: "Gordon", email: "gordon@gmail.com",
      fundName: "American Fund", sharesOwned:200, investmentType:"Brokerage"},
  ]

  selectFeature(feature: string) {
    this.selectedFeature = feature;
  }

  // Function to scrape tax data from the API
  scrapeTaxData() {
    alert(`Scraping data from: ${this.scrapeUrl}`);
    const urlPayload = {
      url: this.scrapeUrl
    }
    if (this.scrapeUrl) {
      this.isLoading = true;
      console.log("Loading started:", this.isLoading);
      this.advisorService.scrapeTaxData(urlPayload)
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.errorMessage = "No tax data found on this website. Please check the URL";
          } else {
            this.taxData = Object.values(data.data);
          }
          this.isLoading = false; // Hide loading indicator
          console.log("Loading started:", this.isLoading);
        },
        error: () => {
          this.errorMessage = "Failed to retrieve tax data. Please try again.";
          this.isLoading = false;
          console.log("Loading started:", this.isLoading);
        }
      });
    }
  }
  openAddClientModal(){}
  openUploadModal(){}
  deleteClient(id:number){}
  editClient(id: number){}

  logout() {
    this.userService.logout();
  }
}
