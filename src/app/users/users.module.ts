import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoute, AdminComponent} from './admin/admin.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {File} from '@ionic-native/file/ngx';
import {TeamsListComponent} from './teams-list/teams-list.component';
import {FlexModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
    declarations: [AdminComponent, TeamsListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([AdminRoute]),
        MatButtonModule,
        MatIconModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        FlexModule,
        ScrollingModule,

    ],
    entryComponents:[TeamsListComponent],
    providers: [File]
})
export class UsersModule {
}
