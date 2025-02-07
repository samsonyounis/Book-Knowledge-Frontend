import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {
  private apiUrl = '/api/clients';

  constructor(private http: HttpClient) {}

  getClientById(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clientId}`);
  }

  getClientReports(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${clientId}/reports`);
  }
}
