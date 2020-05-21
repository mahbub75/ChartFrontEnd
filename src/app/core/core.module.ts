import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationService} from './service/authorization.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[AuthorizationService]
})
export class CoreModule { }
