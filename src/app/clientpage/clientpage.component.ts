import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientserviceService } from '../clientservice.service';
import { CommonModule } from '@angular/common';
import { ChartData, ChartType } from 'chart.js';
import 'chart.js/auto';


@Component({
  selector: 'app-clientpage',
  imports: [CommonModule],
  templateUrl: './clientpage.component.html',
  styleUrl: './clientpage.component.css'
})
export class ClientpageComponent {

  client: any = {};
  reports: any[] = [];
  selectedTab: string = 'reports';

  // chartData: any[] = [];
  // chartLabels: string[] = [];
  chartData: ChartData<'pie'> = {
    labels: ['Taxable Accounts', 'Advisory Accounts', 'Other Investments'],
    datasets: [
      {
        data: [80, 15, 5],  // Example: Client A has 80% in taxable accounts
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  chartType: ChartType = 'pie';

  insights = [
    "Client A has 80% of their portfolio in taxable accounts.",
    "Consider converting brokerage accounts to advisory for Client B.",
    "Client C could save $2,000 by rebalancing their portfolio."
  ];
  constructor(private clientService: ClientserviceService) {}
  private route = inject(ActivatedRoute);


  ngOnInit() {
    const clientId = this.route.snapshot.paramMap.get('clientId')?? '';
    
    // this.clientService.getClientById(clientId).subscribe(data => {
    //   this.client = data;
    // });

    // this.clientService.getClientReports(clientId).subscribe(data => {
    //   this.reports = data;
    //   this.generateChartData();
    // });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  generateChartData() {
    const brokerageTax = this.reports
      .filter(r => r.investmentType === 'Brokerage')
      .reduce((sum, r) => sum + r.totalTax, 0);

    const advisoryTax = this.reports
      .filter(r => r.investmentType === 'Advisory')
      .reduce((sum, r) => sum + r.totalTax, 0);

    this.chartData.labels = ['Brokerage Tax', 'Advisory Tax'];
    this.chartData.datasets = [{ data: [brokerageTax, advisoryTax], backgroundColor: ['#007bff', '#28a745'] }];
  }

  downloadReport(type: string) {
    const clientId = this.client.clientId;
    const url = `/api/reports/${type}/${clientId}`;
    window.open(url, '_blank');
  }
}
