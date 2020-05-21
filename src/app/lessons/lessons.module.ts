import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonsPageRoutingModule } from './lessons-routing.module';

import { LessonsPage } from './lessons.page';
import {ControlLabComponent} from './control-lab/control-lab.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [LessonsPage , ControlLabComponent]
})
export class LessonsPageModule {}
