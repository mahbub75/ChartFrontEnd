import {Component, OnInit} from '@angular/core';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    selectedDate: string;
    dateDisplayFormat = 'DD/MM/YYYY';

    constructor(private file: File) {
        // const date = new Date();
        // this.currentDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    }

    ngOnInit() {

    }

    // onUploadFiles() {
    //     this.fileOp(this.file.dataDirectory, 'C:\\New folder (2)').then(_ => console.log('Directory exists')).catch(err =>
    //         console.log('Directory doesn\'t exist'));
    // }

    compareDate() {
        // if (input1Date.getTime() < input2Date.getTime())
    }

}

export const AdminRoute = {path: '', component: AdminComponent}