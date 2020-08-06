import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionComponent, SessionRoute} from './session/session.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {FileSelectorComponent} from './files/file-selector/file-selector.component';
import {FileListComponent} from './files/file-list/file-list.component';



@NgModule({
  declarations: [SessionComponent,FileSelectorComponent, FileListComponent],
  exports: [
    SessionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      SessionRoute,
    ]),
    IonicModule,
    FormsModule,
    CoreModule
  ]
})
export class SessionModule { }
