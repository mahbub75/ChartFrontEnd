import { Injectable } from '@angular/core';
import {CoreRepository} from '../core-repository';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router) { }
  get isLoggedIn(): boolean {
    return !!(CoreRepository.user);
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }


}
