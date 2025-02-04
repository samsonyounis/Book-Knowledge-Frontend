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
  userEmail:string='';
  password='';
  confirmPassword='';

  passwordMismatch = false;

  checkPasswords() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }
  onRegister(form:any){
    if (form.valid && !this.passwordMismatch) {
      console.log("Form vvalid and passwords match");
      alert("Registration Successful!");
      form.reset();

      const userData = {
        fullName: this.userFullName,
        email: this.userEmail,
        password: this.password
      }
  
      // Send POST request
      this.userService.registerUser(userData).subscribe({
        next: (response) => {
          console.log(response.message);
          if(response.status==='00'){
            alert(response.message);
            //navigate to login
            this.router.navigateByUrl("/login")
          }
          alert(response.message);
          //navigate to error page with the response message
        },
        error: (error) => {
          console.error('Error:', error);
          alert(error.message);
          //navigate to error page with the error meesage
        }
      });
    }
    }
}
