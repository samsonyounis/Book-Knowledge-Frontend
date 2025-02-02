import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{

    loginState = false;
    onLogin(){
        localStorage.setItem('authToken', 'dummy-token');
        this.loginState = true;
    }

    logOut(){
        localStorage.removeItem('authToken');
        this.loginState = false;
    }
}