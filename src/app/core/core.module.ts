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
import {FileUploadModule} from 'ng2-file-upload';
import {FileListComponent} from './files/file-list/file-list.component';
import {MultiFileUploadComponent} from './files/multi-file-upload/multi-file-upload.component';
import {SingleFileUploaderComponent} from './files/single-file-uploader/single-file-uploader.component';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [DrawingGraphComponent, BaseComponent,  MultiFileUploadComponent,FileListComponent,SingleFileUploaderComponent],
    imports: [
        CommonModule,
        IonicModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatGridListModule,
        FileUploadModule,
        FormsModule,
        FlexModule,
        FlexLayoutModule

    ],
    exports: [
        DrawingGraphComponent,
        MultiFileUploadComponent,
        FileListComponent,
        SingleFileUploaderComponent
    ],
  providers: [AuthorizationService, { provide: ErrorHandler, useClass: CustomErrorHandler }]
})
export class CoreModule { }
