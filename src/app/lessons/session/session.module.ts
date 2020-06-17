import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionComponent, SessionRoute} from './session/session.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [SessionComponent],
  exports: [
    SessionComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild([
        SessionRoute,
      ])
  ]
})
export class SessionModule { }
