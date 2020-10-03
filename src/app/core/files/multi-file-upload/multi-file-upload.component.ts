import {Component, EventEmitter,OnInit, Output} from '@angular/core';
import {FileUploader, FileLikeObject} from 'ng2-file-upload';
import {BaseComponent} from '../../component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-multi-file-upload',
    templateUrl: './multi-file-upload.component.html',
    styleUrls: ['./multi-file-upload.component.scss'],
})
export class MultiFileUploadComponent extends BaseComponent implements OnInit{
    public uploader: FileUploader = new FileUploader({});
    @Output() selectedFiles = new EventEmitter<FileLikeObject[]>();

    constructor(toastController: ToastController) {
        super(toastController);
    }

    ngOnInit() {
    }

    getFiles() {
        const selectedFiles = this.uploader.queue.map((fileItem) => {
            return fileItem.file;
        });
        this.selectedFiles.emit(selectedFiles);
    }


}
