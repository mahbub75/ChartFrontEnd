import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrentLessonComponent, CurrentLessonRoute} from './current-lesson.component';
import {Router, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [CurrentLessonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      CurrentLessonRoute
    ]),
    IonicModule
  ]

})
export class CurrentLessonModule { }
