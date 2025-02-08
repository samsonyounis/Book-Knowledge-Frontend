import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EnrollRouteGuardService } from './EnrollRouteGaurdService';
import { ContactDeactivateRouteGuard } from './services/ContactDeactivateRouteGuard';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CreatepollComponent } from './createpoll/createpoll.component';
import { AdvisordashboardComponent } from './advisordashboard/advisordashboard.component';
import { DashboadrouteguardService } from './dashboadrouteguard.service';
import { ClientpageComponent } from './clientpage/clientpage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'about', component: AboutComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'cart', component: ShoppingcartComponent},
    {path: 'contact', component: ContactComponent, canDeactivate: [ContactDeactivateRouteGuard]},
    {path: 'login',component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'createpoll', component: CreatepollComponent},
    {path: 'advisordashboard',component: AdvisordashboardComponent, canActivate:[DashboadrouteguardService]},
    { path: 'client/:clientId', component: ClientpageComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: '**', redirectTo: '/error?message=Page%20not%20found!'} 
    // {path: '**', component: ErrorComponent}
];
