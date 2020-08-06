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

@NgModule({
  declarations: [DrawingGraphComponent, BaseComponent],
    imports: [
        CommonModule,
        IonicModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatGridListModule,

    ],
  exports: [
    DrawingGraphComponent
  ],
  providers: [AuthorizationService, { provide: ErrorHandler, useClass: CustomErrorHandler }]
})
export class CoreModule { }
