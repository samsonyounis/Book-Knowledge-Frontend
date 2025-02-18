import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { AdvisordashboardserviceService } from '../advisordashboardservice.service';
import { catchError, map, Observable } from 'rxjs';
declare var bootstrap: any;


@Component({
  selector: 'app-advisordashboard',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './advisordashboard.component.html',
  styleUrl: './advisordashboard.component.css'
})
export class AdvisordashboardComponent {
  constructor(private userService: UserServiceService,
              private route:ActivatedRoute,
              private advisorService: AdvisordashboardserviceService){}

  fullName = localStorage.getItem("username");
  selectedFeature: string = 'analytics';
  scrapeUrl: string = '';
  scrapeMessage ='';
  taxData: any[] = [];
  insights: any[] = [];
  analytics = {totalClients:0, brokerage:0, advisory:0};

  isLoading: boolean = false; // Loading state
  addurlLoading: boolean =false;
  errorMessage: string | null = null;
  urlEerrorMessage: string | null = null;
  clientErrorMessage: string | null = null;
  nextId: number = 1;

  reports = [
    { name: '2024 Tax Analysis', date: '2024-12-31' },
    { name: 'Q4 Financial Summary', date: '2024-11-30' },
  ];

  clients:any[] =[]
  newUrl = { websiteName:'', websiteUrl: '', selectors: '' };
  newClient = { clientId:'', clientName: '', clientEmail: '' };
  newPortfolio = { clientId:'', fundName: '', accountName:'', sharesOwned: '', investmentType:''};


  urls: { id: number,websiteName:string, websiteUrl: string, selectors:string, editing: boolean }[] = [];


  ngOnInit() {
    // this.fetchUrls(); // Fetch URLs on component load
    // this.fetchCliets();
    // this.fetchScrapedData();
    // this.getAllInsights();
    this.getAnalytics();
    // Auto-close navbar when clicking outside
    document.addEventListener('click', (event) => {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const targetElement = event.target as HTMLElement;
        if (!targetElement.closest('.navbar')) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      }
    });
  }

  CallSelectedMethod(selectedFeature:string){
    
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  }
  collapseNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Collapse the navbar when clicking the burger button again
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  }

  selectFeature(feature: string) {
    this.selectedFeature = feature;
    if(feature==='analytics'){
      this.getAnalytics();
    }
    if(feature==='insights'){
      this.getAllInsights();
    }
    if(feature==='clients'){
      this.fetchCliets();
    }
    if(feature==='scrape'){
      this.fetchUrls();
      // this.fetchScrapedData();
    }
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
            this.isLoading = false;
            this.errorMessage = "No tax data found on this website. Please check the URL"+data.message;
          } else {
            this.isLoading = false;
            this.scrapeMessage = data.message;
            this.taxData = Object.values(data.data);
          }
        },
        error: () => {
          this.errorMessage = "Server error. Please try again.";
          this.isLoading = false;
          console.log("Loading started:", this.isLoading);
        }
      });
    }
  }
  openAddUrlModal() {
    const modalElement = document.getElementById('addUrlModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openAddClientModal() {
    const modalElement = document.getElementById('addClientModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openAddClientPortfolioModal(clientId:string) {
    this.newPortfolio.clientId = clientId; // Prefill clientId
    const modalElement = document.getElementById('addClientPortfolioModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openUploadModal(){}
  addClientPortfolio(){
    if (!this.newPortfolio.clientId || !this.newPortfolio.fundName || !this.newPortfolio.investmentType || 
      !this.newPortfolio.sharesOwned) {
      alert('Please fill in all fields.');
      return;
    }
    this.addurlLoading = true;
    this.advisorService.addClientPortfolio(this.newPortfolio)
      .subscribe({
        next: (data) => {
          if(data.status==='00'){
            this.newPortfolio = { clientId:'', fundName: '', accountName: '', sharesOwned: '' ,investmentType:''}; // Reset form
            this.addurlLoading = false;
            alert(data.message)
            const modalElement = document.getElementById('addClientPortfolioModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              modal?.hide();
            }
    }
    else{
      this.addurlLoading = false;
      alert(data.message)
    }     
  },
   error: () => {
    this.addurlLoading = false;
    console.log("Error occurred!");
        }
  });
  }
  
  addClient() {
    if (!this.newClient.clientName || !this.newClient.clientEmail || !this.newClient.clientId) {
      alert('Please fill in all fields.');
      return;
    }
    this.addurlLoading = true;
    this.advisorService.addClient(this.newClient)
      .subscribe({
        next: (data) => {
          if(data.status==='00'){
            this.addurlLoading = false
            this.clientErrorMessage = "";
            this.clients.push({ clientId: this.newClient.clientId, name: this.newClient.clientName, email: this.newClient.clientEmail });
            this.newClient = { clientId:'', clientName: '', clientEmail: '' }; // Reset form
            const modalElement = document.getElementById('addClientModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              modal?.hide();
            }
    }
    else{
      this.addurlLoading = false;
      alert(data.message)
    }     
  },
   error: (error) => {
    this.addurlLoading = false;
    alert(error.message)
    console.log("Error occurred!");
        }
  });
}
   
  deleteClient(id:string){}
  editClient(id: string){}

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
    this.urls.splice(index, 1);
  }
  fetchUrls() {
    this.isLoading = true;
    console.log("Fetching urls");
    this.advisorService.fetchUrls()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.isLoading = false;
            console.log("No url data found",data.meesage);
          } else {
            this.urls = data.data.map((item: any) => ({
              id: item.id,
              websiteName: item.websiteName,
              websiteUrl: item.websiteUrl,
              selectors: item.selectors,
              editing: false
            }));
            this.isLoading = false;
          }
          console.log("Loaded urls:", this.isLoading);
        },
        error: () => {
          this.isLoading = false;
          console.log("Error occured:");
        }
      });
  }

  getAnalytics() {
    this.isLoading = true;
    console.log("Fetching analytics");
    this.advisorService.getAnalytics()
      .subscribe({
        next: (data) => {
          this.analytics.totalClients = data.data.totalClients;
          this.analytics.brokerage = data.data.brokerageAccounts;
          this.analytics.advisory = data.data.advisoryAccounts;
          this.fetchScrapedData(); // Call fetchScrapedData after fetchUrls completes
          this.isLoading = false;
        },
        error: () => {
          this.fetchScrapedData(); // Call fetchScrapedData after fetchUrls completes
          this.isLoading = false;
          console.log("Error occured:");
        }
      });
  }

  getAllInsights() {
    this.isLoading = true;
    console.log("Fetching insights");
    this.advisorService.getAllInsights()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.isLoading = false;
            console.log("No insights found",data.meesage);
          } else {
            this.insights = data.data;
            this.isLoading = false;
          }
          console.log("Loaded insights:", this.isLoading);
        },
        error: () => {
          this.isLoading = false;
          console.log("Error occured:");
        }
      });
  }

  fetchCliets() {
    console.log("Fetching Clients");
    this.isLoading = true;
    this.advisorService.fetchClients()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.clientErrorMessage = "No clients yet";
            this.isLoading = false;
            console.log("No Clients data found",data.meesage);
          } else {
            this.clients = data.data.map((client: any) => ({
              clientId: client.clientId,
              name: client.clientName,
              email: client.clientEmail,
            }));
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log("Error occured:"+error.message);
        }
      });
  }
  fetchScrapedData() {
    this.isLoading = true;
    console.log("Fetching previously scraped data");
    this.advisorService.fetchScrapedData()
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.isLoading = false;
            this.errorMessage = data.message;
            console.log("No Tax data found",data.meesage);
          } else {
            this.isLoading = false;
            this.scrapeMessage = data.message;
            this.taxData = Object.values(data.data);
          }
          console.log("Loaded urls:", this.isLoading);
        },
        error: () => {
          this.isLoading = false;
          console.log("Error occured:");
        }
      });
  }
  scrapeFromUrl(urlData:any){
    alert(`Scraping data from: ${urlData.websiteUrl}`);
    const urlPayload = {
      url: urlData.websiteUrl
    }
    if (urlData.websiteUrl) {
      this.errorMessage='';
      this.isLoading = true;
      this.taxData = [];
      console.log("Loading State:", this.isLoading);
      this.advisorService.scrapeTaxData(urlPayload)
      .subscribe({
        next: (data) => {
          if (Object.values(data.data).length === 0) {
            this.isLoading = false;
            this.errorMessage = "No tax data found on this website. Please check the URL"+data.message;
          } else {
            this.isLoading = false;
            this.scrapeMessage = data.message;
            this.taxData = Object.values(data.data);
          }
        },
        error: () => {
          this.errorMessage = "Server error. Please try again.";
          this.isLoading = false;
          console.log("Loading started:", this.isLoading);
        }
      });
    }
  }
  addUrl() {
    if (this.newUrl.websiteUrl === '' || this.newUrl.selectors ==='') {
      alert("Website URL field or selectors field are empty....Please fill the fields")
    }
      this.addurlLoading = true;
      this.advisorService.addUrl(this.newUrl)
      .subscribe({
        next: (data) => {
          if (data.status =='01') {
            alert(data.message);
            this.addurlLoading = false; // Hide loading indicator
          } else {
            const modalElement = document.getElementById('addUrlModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              modal?.hide();
            }
            this.urls.push({ id: data.data.id, websiteName: this.newUrl.websiteName, websiteUrl:this.newUrl.websiteUrl, selectors: this.newUrl.selectors, editing: false });
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
