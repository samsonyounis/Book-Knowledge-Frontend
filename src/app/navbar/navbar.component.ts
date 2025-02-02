import { Component, ElementRef, ViewChild } from '@angular/core';
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


 constructor(private userservice: UserServiceService){}

 closeNavbar() {
  if (this.navbarCollapse) {
    this.navbarCollapse.nativeElement.classList.remove('show'); // Collapses menu
  }
}

 ngOnInit(){
//  this.users = this.userservice.getUsers();
//  this.message = this.userservice.getMessage();
 }
}
