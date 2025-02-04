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

  fullName = localStorage.getItem("username");
  selectedFeature: string = 'analytics';
  scrapeUrl: string = '';
  taxData: any[] = [];
  isLoading: boolean = false; // Loading state
  addurlLoading: boolean =false;
  errorMessage: string | null = null;
  urlEerrorMessage: string | null = null;
  nextId: number = 1;

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
  urls: { id: number, url: string, editing: boolean }[] = [];


  ngOnInit() {
    this.fetchUrls(); // Fetch URLs on component load
  }
  selectFeature(feature: string) {
    this.selectedFeature = feature;
  }

  // Function to scrape tax data from the API
  scrapeTaxData() {
    if (this.scrapeUrl.trim() === '') {
      alert("URL field is empty....Please enter URL")
    }
    const urlPayload = {
      url: this.scrapeUrl
    }
    if (this.scrapeUrl) {
      alert(`Scraping data from: ${this.scrapeUrl}`);
      this.isLoading = true;
      this.errorMessage ='';
      this.taxData = [];
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
  editUrl(urlData: any) {
    urlData.editing = true;
  }

  saveUrl(urlData: any) {
    urlData.editing = false;
  }

  deleteUrl(index: number) {
    //should remove object from db and hen from the list
    this.urls.splice(index, 1);
  }
  fetchUrls() {
    console.log("Fetching urls");
    this.advisorService.fetchUrls()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            console.log("No url data found",data.meesage);
            console.log("No url data found",data.data);
          } else {
            this.urls = data.data.map((item: any) => ({
              id: item.id,
              url: item.websiteUrl,
              editing: false
            }));
          }
          console.log("Loaded urls:", this.isLoading);
        },
        error: () => {
          console.log("Error occured:");
        }
      });
  }
  scrapeFromUrl(urlData:any){
    alert(`Scraping data from: ${urlData.url}`);
    const urlPayload = {
      url: urlData.url
    }
    if (urlData.url) {
      this.errorMessage='';
      this.isLoading = true;
      this.taxData = [];
      console.log("Loading State:", this.isLoading);
      this.advisorService.scrapeTaxData(urlPayload)
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.errorMessage = "No tax data found on this website. Please check the URL";
          } else {
            this.taxData = Object.values(data.data);
          }
          this.isLoading = false; // Hide loading indicator
          console.log("Loading state:", this.isLoading);
        },
        error: () => {
          this.errorMessage = "Failed to retrieve tax data. Please try again.";
          this.isLoading = false;
          console.log("Loading started:", this.isLoading);
        }
      });
    }
  }
  addUrl() {
    if (this.scrapeUrl.trim() === '') {
      alert("URL field is empty....Please enter URL")
    }
    const urlPayload = {
      websiteName:'',
      websiteKeywords:'',
      websiteUrl: this.scrapeUrl
    }
    if (this.scrapeUrl) {
      this.addurlLoading = true;
      this.advisorService.addUrl(urlPayload)
      .subscribe({
        next: (data) => {
          if (data.status =='01') {
            alert(data.message);
            this.addurlLoading = false; // Hide loading indicator
          } else {
            this.urls.push({ id: data.data.id, url: this.scrapeUrl, editing: false });
            this.scrapeUrl = ''; // Clear input after adding
          }
          this.addurlLoading = false; // Hide loading indicator
          console.log("addUrlLoading State:", this.addurlLoading);
        },
        error: () => {
          this.urlEerrorMessage = "Failed to add URL. Please try again.";
          this.addurlLoading = false;
          console.log("addUrlLoading State:", this.addurlLoading);
        }
      });
    }
  }
}
