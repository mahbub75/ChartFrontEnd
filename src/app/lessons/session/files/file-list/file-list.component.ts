import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileModel} from '../file-model';
import {FileService} from '../file.service';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../../../../core/component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent extends BaseComponent implements OnInit {
    @Input() sessionId: string;
    @Input() header = 'لیست فایل ها';
    @Output() selectedFileContent = new EventEmitter<any>();
    @Input() files: FileModel[] = [];
    subscriptions: Subscription[] = [];

    constructor(private fileService: FileService, toastController: ToastController) {
        super(toastController);
    }

    ngOnInit() {
    }

    getAllFiles() {
        this.subscriptions.push(
            this.fileService.getFiles(this.sessionId).subscribe(files => {
                    this.files = files;
                }
            )
        )
    }

    getFile(filePath: string) {
        this.subscriptions.push(
            this.fileService.getFile(filePath).subscribe(fileContent => {
                this.selectedFileContent.emit(fileContent);
            })
        )

    }

    downloadFile(filePath: string) {
        this.fileService.downloadFile(filePath);
    }

    deleteFile(fileId: string, filePath: string) {
        this.subscriptions.push(
            this.fileService.deleteFile(fileId, filePath).subscribe(res => {
                this.getAllFiles();
                this.presentToast(filePath + ' با موفقیت حذف شد')
            })
        )
    }

}
