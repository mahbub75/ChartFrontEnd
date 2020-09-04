import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader, FileLikeObject} from 'ng2-file-upload';
import {FileService} from '../file.service';

@Component({
    selector: 'app-multi-file-upload',
    templateUrl: './multi-file-upload.component.html',
    styleUrls: ['./multi-file-upload.component.scss'],
})
export class MultiFileUploadComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver = false;
    @Output() selectedFiles = new EventEmitter<FileLikeObject[]>();

    constructor(private fileService: FileService) {
    }

    ngOnInit() {
    }

    getFiles() {
        const selectedFiles = this.uploader.queue.map((fileItem) => {
            return fileItem.file;
        });
        this.selectedFiles.emit(selectedFiles);
    }

    // fileOverBase(ev): void {
    //     this.hasBaseDropZoneOver = ev;
    // }

    reorderFiles(reorderEvent: CustomEvent): void {
        const element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
        this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
    }

}
