import { Injectable } from '@angular/core';
import {BasicClass} from '../classes/basic-class';


@Injectable({
  providedIn: 'root'
})
export class BasicService extends BasicClass{
  constructor() {
    super();
  }

}
