import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';

const routes: Routes = [
  {
    path: '',
    component:LessonsPage
  },
  {
    path: ':lessonId',
    loadChildren: () => import('./current-lesson/current-lesson.module').then( m => m.CurrentLessonModule)
  },
  {
    path: ':lessonId'+'/'+ 'session'+'/'+':sessionId',
    loadChildren: () => import('./session/session.module').then( m => m.SessionModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
