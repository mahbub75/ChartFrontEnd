import { Injectable } from '@angular/core';
import {CoreRepository} from '../core-repository';
import {Router} from '@angular/router';
import {BasicClass} from '../classes/basic-class';
import {BasicService} from './basic.service';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends BasicService{

  constructor(private router:Router) {
    super();
  }
  get isLoggedIn(): boolean {
    return !!(CoreRepository.user);
  }
 async logOut(){
      localStorage.clear();
 await this.router.navigate(['/login'])
  }


}
