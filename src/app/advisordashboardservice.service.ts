import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdvisordashboardserviceService {

  private localUrl = "http://localhost:4009/api/v1/advisor";
  private baseUrl ="https://tax-app-backend-50fa99ed12cc.herokuapp.com/api/v1/advisor";
  constructor(private http:HttpClient,private router: Router,
       private userService: UserServiceService) { }

  private getFullUrl(endpoint: string): string {
    return `${this.localUrl}${endpoint}`;
  }

  scrapeTaxData(url: any): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.post(this.getFullUrl("/scrape"), url,{headers})
      .pipe(catchError(this.handleError));
    }

    addClient(client: any): Observable<any> {
      const token = this.userService.getToken();
      // Set up headers with Bearer Token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
        return this.http.post(this.getFullUrl("/add-client"), client,{headers})
        .pipe(catchError(this.handleError));
      }

      addClientPortfolio(portfolio: any): Observable<any> {
        const token = this.userService.getToken();
        // Set up headers with Bearer Token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
          return this.http.post(this.getFullUrl("/add-client-holding"), portfolio,{headers})
          .pipe(catchError(this.handleError));
        }

    addUrl(url: any): Observable<any> {
      const token = this.userService.getToken();
      // Set up headers with Bearer Token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
        return this.http.post(this.getFullUrl("/add-url"), url,{headers})
        .pipe(catchError(this.handleError));
      }

      fetchUrls(): Observable<any> {
        const token = this.userService.getToken();
        // Set up headers with Bearer Token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
          return this.http.post(this.getFullUrl("/get-all-urls"),{}, {headers})
          .pipe(catchError(this.handleError));
        }
        fetchClients(): Observable<any> {
          const token = this.userService.getToken();
          // Set up headers with Bearer Token
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          });
            return this.http.post(this.getFullUrl("/get-clients"),{}, {headers})
            .pipe(catchError(this.handleError));
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
