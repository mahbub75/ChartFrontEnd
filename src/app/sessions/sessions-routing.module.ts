import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SessionsPage, SessionsPageRoute} from './sessions.page';

const routes: Routes = [
  SessionsPageRoute,
  {
    path:':sessionId',
    loadChildren: () => import('./current-session/current-session.module').then(m => m.CurrentSessionModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsPageRoutingModule {}
