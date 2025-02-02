import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  const router = inject(Router); // Inject Router without constructor

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred!';

      if (error.status === 404) {
        errorMessage = 'Page not found!';
        router.navigate(['/error'], { queryParams: { message: errorMessage } });
      } else if (error.status === 500) {
        errorMessage = 'Internal server error!';
        router.navigate(['/error'], { queryParams: { message: errorMessage } });
      } else if (error.status === 0) {
        errorMessage = 'No connection to the server!';
        router.navigate(['/error'], { queryParams: { message: errorMessage } });
      } else {
        errorMessage = error.error?.message || 'Something went wrong!';
        router.navigate(['/error'], { queryParams: { message: errorMessage } });
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
