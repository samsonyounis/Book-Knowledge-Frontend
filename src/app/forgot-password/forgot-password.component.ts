import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading = false;

  constructor(private http: HttpClient, private userService: UserServiceService){}

  onForgotPassword(){
    this.isLoading = true;
     this.userService.forgotPassword(this.email).subscribe({
      next: (response) => {
        if (response.status === '00') {
          console.log(response.message);
          alert(response.message);
          this.isLoading = false;
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
