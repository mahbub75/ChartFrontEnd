import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }
  isLogged=false;
  get isLoggedIn(){
    return this.isLogged;
  }
  set  loginStatus(loginStatus:boolean){
    this.isLogged=loginStatus;
  }

}
