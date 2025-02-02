import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ItCourse } from './interfaces/ItCourse';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private url = "courses.json";

  constructor(private http:HttpClient) { }

  getCoursesFromApi(): Observable<ItCourse[]> {

    return this.http.get<ItCourse[]>(this.url)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching the courses.';

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

  getCourses() {
    return [
      {"id":1,"title":"HTML","instructor":"samson","duration":"12","des":"this the basic for beginners","image":"logo.jpg"},
      {"id":1,"title":"PHP","instructor":"Bill","duration":"10","des":"for backend","image":"logo.jpg"},
      {"id":1,"title":"JavaScript","instructor":"Frank","duration":"8","des":"for making the page dynamiv","image":"logo.jpg"},
      {"id":1,"title":"Angular","instructor":"Felix","duration":"10","des":"framework for buiding SPA web apps","image":"logo.jpg"}
    ];
  }
}
