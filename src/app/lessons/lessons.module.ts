import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LessonsPageRoutingModule } from './lessons-routing.module';
import { LessonsPage } from './lessons.page';
import {HttpClientModule} from '@angular/common/http';
import {CurrentLessonComponent} from './current-lesson/current-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule,
  ],
  declarations: [LessonsPage]
})
export class LessonsPageModule {}
