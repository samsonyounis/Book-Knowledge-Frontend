import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientserviceService } from '../clientservice.service';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import 'chart.js/auto';
// import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-clientpage',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './clientpage.component.html',
  styleUrl: './clientpage.component.css'
})
export class ClientpageComponent {

  isLoading = false;
  errorMessage = '';
  clientId ='';
  client: any = {};
  reports: any[] = [];
  insights: any[] = [];
  selectedTab: string = 'reports';
  chartData: ChartData<'pie'> = {
    labels: ['Brokerage Accounts', 'Advisory Accounts', 'Other Investments'],
    datasets: [
      {
        data: [80, 15, 1],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  chartType: ChartType = 'pie';
  pieChartOptions: ChartOptions = {maintainAspectRatio: false,responsive: true };

  constructor(private clientService: ClientserviceService, private route: ActivatedRoute) {}


  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('clientId')?? '';
    
    this.getClientById();
    this.getClientReports();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  getClientById(){
    console.log("Getting client")
    const payload = {
      email: '',
      clientId: this.clientId
    }
    this.errorMessage='';
    this.isLoading = true;
    this.clientService.getClientById(payload)
    .subscribe({
      next: (data) => {
        if (data.status === "00") {
          this.client = data.data;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          alert(data.meesage);
          this.errorMessage = data.message;
        }
      },
      error: (error) => {
        this.errorMessage = "Server error. Please try again.";
        this.isLoading = false;
        alert(error.message);
      }
    });
  }

  calculateTax(){
    this.selectedTab = "calculate";
    this.isLoading = true;
    this.errorMessage='';
    console.log("Getting client tax")
    const payload = {
      email: '',
      clientId: this.clientId
    }
    this.clientService.calculateClientTax(payload)
    .subscribe({
      next: (data) => {
        if (data.status === "00") {
          this.reports = data.data.reports;
          this.insights = data.data.insights;
          this.isLoading = false;
          //navigate to reports tab
          this.selectedTab = 'reports';
        } else {
          this.isLoading = false;
          alert(data.meesage);
          this.errorMessage = data.message;
        }
      },
      error: (error) => {
        this.errorMessage = "Server error. Please try again.";
        this.isLoading = false;
        alert(error.message);
      }
    });
  }
  getClientReports(){
    this.selectedTab = "reports";
    this.isLoading = true;
    this.errorMessage='';
    console.log("Getting client tax reports")
    const payload = {
      email: '',
      clientId: this.clientId
    }
    this.clientService.getClientReports(payload)
    .subscribe({
      next: (data) => {
        if (data.status === "00") {
          this.reports = data.data.reports;
          this.insights = data.data.insights;
          this.generateChartData();
          this.isLoading = false;
          //navigate to reports tab
          this.selectedTab = 'reports';
        } else {
          this.isLoading = false;
          alert(data.meesage);
          this.errorMessage = data.message;
        }
      },
      error: (error) => {
        this.errorMessage = "Server error. Please try again.";
        this.isLoading = false;
        alert(error.message);
      }
    });
  }

  downloadReport(type: string) {
    const clientId = this.client.clientId;
    const url = `/api/reports/${type}/${clientId}`;
    window.open(url, '_blank');
  }

  generateChartData() {
    const brokerageTax = this.reports
    .filter(r => r.investmentType.toLowerCase().includes('brokerage'))
    .reduce((sum, r) => sum + r.totalTax, 0);

    const advisoryTax = this.reports
    .filter(r => r.investmentType.toLowerCase().includes('advisory'))
    .reduce((sum, r) => sum + r.totalTax, 0);

    const otherInvestmentTax = this.reports
  .filter(r => {
    const type = r.investmentType.toLowerCase();
    return !type.includes('advisory') && !type.includes('brokerage'); // Exclude both
  })
  .reduce((sum, r) => sum + r.totalTax, 0);

    this.chartData.labels = ['Brokerage Accounts Tax', 'Advisory Accounts Tax','Other Investments Tax'];
    this.chartData.datasets = [{ data: [brokerageTax, advisoryTax, otherInvestmentTax], backgroundColor: ['#007bff', '#28a745', '#FFCE56'] }];
  }

  getClientInsights(){
    console.log("Getting the clinet insights");
  }
}
