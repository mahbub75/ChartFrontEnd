import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';
import {ControlLabComponent} from './control-lab/control-lab.component';

const routes: Routes = [
  {
    path: '',
    component:LessonsPage
  },
  { path: 'control-lab', component: ControlLabComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
