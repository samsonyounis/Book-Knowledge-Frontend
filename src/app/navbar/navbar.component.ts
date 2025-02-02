import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 public message:String = "Welcome to Thaleem LMS";
 public users:object = [];

 @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
 isNavbarOpen = false;

 constructor(private userservice: UserServiceService){}

 closeNavbar() {
  if (this.navbarCollapse) {
    this.navbarCollapse.nativeElement.classList.remove('show'); // Collapses menu
  }
  // this.isNavbarOpen = false;
  // this.navbarCollapse.nativeElement.classList.remove('show');
}
toggleNavbar() {
  this.isNavbarOpen = !this.isNavbarOpen;
  if (this.isNavbarOpen) {
    this.navbarCollapse.nativeElement.classList.add('show');
  } else {
    this.navbarCollapse.nativeElement.classList.remove('show');
  }
}

// Close Navbar When Clicking Outside
@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  if (
    this.isNavbarOpen &&
    this.navbarCollapse &&
    !this.navbarCollapse.nativeElement.contains(event.target)
  ) {
    this.closeNavbar();
  }
}

 ngOnInit(){
//  this.users = this.userservice.getUsers();
//  this.message = this.userservice.getMessage();
 }
}
