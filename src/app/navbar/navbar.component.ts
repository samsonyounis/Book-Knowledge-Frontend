import { Component } from '@angular/core';
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

 constructor(private userservice: UserServiceService){}

 ngOnInit(){
//  this.users = this.userservice.getUsers();
//  this.message = this.userservice.getMessage();
 }
}
