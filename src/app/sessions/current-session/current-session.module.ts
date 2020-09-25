import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrentSessionComponent, CurrentSessionRoute} from './current-session.component';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [CurrentSessionComponent],
  imports: [
    CommonModule,
    CoreModule,
      IonicModule,
      RouterModule.forChild([ CurrentSessionRoute,])

  ]
})
export class CurrentSessionModule { }
