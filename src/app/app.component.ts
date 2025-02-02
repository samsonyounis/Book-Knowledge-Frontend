import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,HomeComponent, AboutComponent, RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LMS-APP';
  displayLoadingIndicator = false;
   constructor(private router: Router){}

   ngOnInit(){
    // this.router.events.subscribe((routerEvent: Event) => {
    //   if(routerEvent instanceof NavigationStart){
    //     this.displayLoadingIndicator=true;
    //     console.log('Navigation start event occurred');
    //   }
    //   if(routerEvent instanceof NavigationEnd 
    //     || routerEvent instanceof NavigationCancel
    //     || routerEvent instanceof NavigationError){
    //       this.displayLoadingIndicator = false
    //     }
    // })
   }
}
