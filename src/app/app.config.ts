import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { routes } from './app.routes';
import { errorInterceptor } from './errorinterceptor.service';
import {withHashLocation } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),DatePipe,
    provideRouter(routes, withHashLocation()) // Provide the router with routes
  ]
};
