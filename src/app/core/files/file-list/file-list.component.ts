import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileModel} from '../file-model';
import {FileService} from '../file.service';
import {Subscription} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {BaseComponent} from '../../component/BaseComponent/base.component';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent extends BaseComponent implements OnInit {
    @Input() sessionId: string;
    @Input() header = 'لیست فایل ها';
    @Output() selectedFileContent = new EventEmitter<FileModel>();
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
            this.fileService.getFile(filePath).subscribe(file => {
                this.selectedFileContent.emit(file);
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
