import {Component, OnInit, ViewChild} from '@angular/core';
import {Alert, MsgType} from '../../core/classes/alert';
import {DatePipe} from '@angular/common';
import {FileService} from '../../core/files/file.service';
import {MultiFileUploadComponent} from '../../core/files/multi-file-upload/multi-file-upload.component';
import {BaseComponent} from '../../core/component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {
    IMdsAngularDateTimePickerDate,
    IMdsAngularDateTimePickerRangeDate
} from '../../core/component/persian-date-time-picker/classes/interfaces';
import {MdsDatetimePickerUtility} from '../../core/component/persian-date-time-picker/classes/mds-datetime-picker.utility';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [FileService]
})
export class AdminComponent extends BaseComponent implements OnInit {
    dateDisplayFormat = 'YYYY-MM-DD';
    @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;
    startDate: Date;
    endDate: Date;
    subscriptions: Subscription[] = [];

    constructor(toastController: ToastController, private fileService: FileService, private datePipe: DatePipe) {
        super(toastController);
    }

    ngOnInit() {

    }
    dateChanged(newDate: IMdsAngularDateTimePickerDate) {
        console.log(newDate);
        const d = MdsDatetimePickerUtility.dateTimeToString(newDate.utcDateTime, 'yyyy-MM-dd' + ' ' + 'hh:mm:ss');
    }
    rangeDateChangedHandler(rangeDate: IMdsAngularDateTimePickerRangeDate){
        this.startDate = rangeDate.startDate.utcDateTime;
        this.endDate = rangeDate.endDate.utcDateTime;
    }

    upload(files) {

        if (!(this.startDate && this.endDate)) {
            Alert.toast('بازه زمانی را مشخص کنید', MsgType.negative);
        } else {
            const dates = this.dates;
            const formData = new FormData();
            files.forEach((file) => {
                dates.forEach((date) => {
                    if (file.name.includes(date)) {
                        formData.append('files', file.rawFile, file.name)
                    }
                })

            });

            // POST formData to Server
            this.subscriptions.push(
                this.fileService.uploadFile(formData)
                    .subscribe(() => {
                        Alert.toast('آپلود انجام شد', MsgType.positive)
                    }, error => console.log(error))
            )
        }

    }

    get dates() {
        let startDate = new Date(this.startDate);
        const stopDate = new Date(this.endDate);
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        let day = startDate.getDate();
        const dates = [];
        while (startDate <= stopDate) {
            dates.push(this.datePipe.transform(startDate, 'yyyy-MM-dd'));
            startDate = new Date(year, month, ++day);
        }
        return dates;
    }
}

export const AdminRoute = {path: 'admin', component: AdminComponent};

