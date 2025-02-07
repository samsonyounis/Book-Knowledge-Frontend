import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserServiceService,
              private router: Router
  ){}

  userFullName='';
  userEmail='';
  userPassword='';
  confirmPassword='';
  isLoading: boolean = false; // Loading state

  onRegister(form:any){
    if (form.valid) {
      console.log(form.value);
      const userData = {
        fullName: this.userFullName,
        email: this.userEmail,
        password: this.userPassword
      }
      this.isLoading = true;
      // Send POST request
      this.userService.registerUser(userData).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            //navigate to login
            this.isLoading = false;
            this.router.navigateByUrl("/login")
          }
          this.isLoading = false;
          alert(response.message);
          //navigate to error page with the response message
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
          alert(error.message);
          //navigate to error page with the error meesage
        }
      });
    }
    }
}
