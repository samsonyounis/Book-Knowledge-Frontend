import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {


  otp: string = '';  
  newPassword: string = '';  
  confirmPassword: string = '';  
  errorMessage: string = '';  
  successMessage: string = ''; 
  isLoading = false; 

  constructor(private route: ActivatedRoute, private http: HttpClient,
     private router: Router, private userService: UserServiceService) {}

  ngOnInit(): void {
    // Get token from the URL
    this.otp = this.route.snapshot.queryParamMap.get('otp') || '';
  }

    onResetPassword(){
      // if (this.newPassword !== this.confirmPassword) {
      //   this.errorMessage = "Passwords do not match!";
      //   return;
      // }
      this.isLoading = true;
       this.userService.resetPassword(this.otp, this.newPassword).subscribe({
        next: (response) => {
          if (response.status === '00') {
            console.log(response.message);
            alert(response.message);
            this.isLoading = false;
            this.router.navigateByUrl("/login");
          } else {
            console.log(response.message);
            this.isLoading = false;
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('reset password error:', error);
          this.isLoading = false;
          alert(error.message);
        }
      });
    }
  }
