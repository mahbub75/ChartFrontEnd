import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';
import {ControlLabComponent} from './control-lab/control-lab.component';
import {SessionsRoute} from './session-list/session-list.component';

const routes: Routes = [
  {
    path: '',
    component:LessonsPage
  },
  { path: 'control-lab', component: ControlLabComponent},
 SessionsRoute

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
