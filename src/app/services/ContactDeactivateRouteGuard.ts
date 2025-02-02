
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { ContactComponent } from "../contact/contact.component";
import { Observable } from "rxjs";

export interface IDeactivateComponent{
    canExit:() => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root'
  })
export class ContactDeactivateRouteGuard implements CanDeactivate<IDeactivateComponent>{
 
    canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canExit();
    }
}