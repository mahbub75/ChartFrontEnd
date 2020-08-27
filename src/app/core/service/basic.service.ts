import { Injectable } from '@angular/core';
import {BasicClass} from '../classes/basic-class';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BasicService extends BasicClass{
  constructor() {
    super();
  }

}
