import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

// private baseUrl = "http://localhost:4009/api/v1";
private baseUrl ="https://tax-app-backend-50fa99ed12cc.herokuapp.com/api/v1/user";
private localUrl ="http://localhost:4009/api/v1/user";
private tokenKey = 'auth_token';

  constructor(private http:HttpClient,private router: Router) { }

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  createPoll(poll: any): Observable<any> {
    return this.http.post(this.getFullUrl("/register"), poll)
    .pipe(catchError(this.handleError));
  }
  registerUser(user: any): Observable<any> {
    console.log(user.fullName)
    return this.http.post(this.getFullUrl("/register"), user)
    .pipe(catchError(this.handleError));
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    const loginPayload = {
      email: email,
      password: password
    };

    return this.http.post<any>(this.getFullUrl("/login"), loginPayload)
    .pipe(catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<any> {
    const forgotPasswordData = {
      email: email
    };

    return this.http.post<any>(this.getFullUrl("/forgot-password"), forgotPasswordData)
    .pipe(catchError(this.handleError));
  }

  resetPassword(otp: string, newPassword:string): Observable<any> {
    const resetPasswordData = {
      otp: otp,
      newPassword: newPassword
    };

    return this.http.post<any>(this.getFullUrl("/reset-password"), resetPasswordData)
    .pipe(catchError(this.handleError));
  }


  // Store the token in local storage
  storeToken(token: string, username: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem("username", username);

  }

  // Retrieve the token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove the token from local storage (logout)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login'); // Redirect to login page
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage); // Log the error to the console for debugging
    return throwError(() => new Error(errorMessage)); // Return an observable with a user-facing error message
  }
}
