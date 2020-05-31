import { Injectable } from '@angular/core';
import {CoreRepository} from '../core-repository';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }
  get isLoggedIn(): boolean {
    return !!(CoreRepository.user);
  }


}
