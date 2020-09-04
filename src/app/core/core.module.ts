import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationService} from './service/authorization.service';
import {DrawingGraphComponent} from './component/drawing-graph/drawing-graph.component';
import {IonicModule} from '@ionic/angular';
import{MatIconModule} from '@angular/material/icon';
import{MatTooltipModule} from '@angular/material/tooltip';
import{MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {BaseComponent} from './component/BaseComponent/base.component';
import {CustomErrorHandler} from './error-handler/custom-error-handler';
import {MultiFileUploadComponent} from '../lessons/session/files/multi-file-upload/multi-file-upload.component';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  declarations: [DrawingGraphComponent, BaseComponent,  MultiFileUploadComponent],
    imports: [
        CommonModule,
        IonicModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatGridListModule,
        FileUploadModule

    ],
    exports: [
        DrawingGraphComponent,
        MultiFileUploadComponent
    ],
  providers: [AuthorizationService, { provide: ErrorHandler, useClass: CustomErrorHandler }]
})
export class CoreModule { }
