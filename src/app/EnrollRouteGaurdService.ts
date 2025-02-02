import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./AuthService";

@Injectable({
    providedIn: 'root'
  })
export class EnrollRouteGuardService implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.authService.loginState === true){
            return true;
        }
        else{
            this.router.navigate(['login'])
            return false;
        }
    }
}