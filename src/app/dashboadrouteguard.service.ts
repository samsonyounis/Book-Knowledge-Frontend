import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboadrouteguardService implements CanActivate {

  constructor(private userService: UserServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.userService.isLoggedIn() === true){
        return true;
    }
    else{
        this.router.navigate(['login'])
        return false;
    }
}
}
