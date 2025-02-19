import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {
  private localUrl = "http://localhost:4009/api/v1/advisor";
  private baseUrl ="https://tax-app-backend-50fa99ed12cc.herokuapp.com/api/v1/advisor";

  
  constructor(private http: HttpClient, private userService: UserServiceService) {}

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }
  downloadPdf(clientId: string): Observable<Blob> {
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/pdf'
    });

    return this.http.get(this.getFullUrl(`/download-pdf?clientId=${clientId}`), {
      headers,
      responseType: 'blob'
    }).pipe(catchError(this.handleError));
  }

  downloadExcel(clientId: string): Observable<Blob> {
    const token = this.userService.getToken();
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.get(this.getFullUrl(`/download-excel?clientId=${clientId}`), {
      headers,
      responseType: 'blob'
    }).pipe(catchError(this.handleError));
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

  getClientById(payload: any): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.post(this.getFullUrl("/get-client-by-id"), payload, {headers})
      .pipe(catchError(this.handleError));
  }
  calculateClientTax(payload: any): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.post(this.getFullUrl("/get-client-tax"), payload, {headers})
      .pipe(catchError(this.handleError));
  }

  getClientReports(payload: any): Observable<any> {
    const token = this.userService.getToken();
    // Set up headers with Bearer Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
      return this.http.post(this.getFullUrl("/get-client-reports"), payload, {headers})
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
