import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../AuthService';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email='';
  password='';
  userType='ADMIN';
  errorMessage ='';
  isLoading: boolean = false; // Loading state
  constructor(private userSerice: UserServiceService, private router:Router){}

  onLogin(){
    this.isLoading = true;
     // Call the AuthService login method
     this.userSerice.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.status === '00') {
          console.log(response.message);
          // Store the token in local storage
          this.userSerice.storeToken(response.data.accessToken,
            response.data.fullName
          );
          this.isLoading = false;
          // Navigate to the dashboard or home page
          this.router.navigate(['/advisordashboard']);
        } else {
          console.log(response.message);
          this.isLoading = false;
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        alert(error.message);
      }
    });
  }
}
