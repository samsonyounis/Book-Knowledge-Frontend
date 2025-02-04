import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;


@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 public message:String = "Welcome to Thaleem LMS";
 public users:object = [];
 
 constructor(private userservice: UserServiceService){}

 ngOnInit() {
  // Auto-close navbar when clicking outside
  document.addEventListener('click', (event) => {
    const navbarCollapse = document.getElementById('mynavbar');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.closest('.navbar')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    }
  });
}

closeNavbar() {
  const navbarCollapse = document.getElementById('mynavbar');
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
}
