import {Component, OnInit, ViewChild} from '@angular/core';
import {MultiFileUploadComponent} from '../../lessons/session/files/multi-file-upload/multi-file-upload.component';
import {FileService} from '../../lessons/session/files/file.service';
import {Alert, MsgType} from '../../core/classes/alert';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [FileService]
})
export class AdminComponent implements OnInit {
    selectedDate: string;
    dateDisplayFormat = 'YYYY-MM-DD';
    @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;

    constructor(private fileService: FileService) {
    }

    ngOnInit() {

    }

    upload(files) {

        if (!this.selectedDate) {
            Alert.toast('بازه زمانی را مشخص کنید', MsgType.negative)
        } else {
            const formData = new FormData();
            files.forEach((file) => {
                const uploadable = file.name.includes(this.selectedDate.slice(0,10));
                console.log(this.selectedDate.slice(0,10),uploadable,file.name);
                if (uploadable) {
                    formData.append('files', file.rawFile, file.name);
                }
            });

            // POST formData to Server
            this.fileService.uploadFile(formData)
                .subscribe(() => {
                }, error => console.log(error))
        }

    }

    compareDate() {
        // if (input1Date.getTime() < input2Date.getTime())
    }

}

export const AdminRoute = {path: 'admin', component: AdminComponent}