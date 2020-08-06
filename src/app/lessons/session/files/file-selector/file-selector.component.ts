import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileModel} from '../file-model';
import {Subscription} from 'rxjs';
import {FileService} from '../file.service';
import {BaseComponent} from '../../../../core/component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-file-selector',
    templateUrl: './file-selector.component.html',
    styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent extends BaseComponent implements OnInit, AfterViewInit {
    @Input() sessionId: string;
    @Output() selectedFileName = new EventEmitter<string>() ;
    subscriptions: Subscription[] = [];
    @ViewChild(FileSelectorComponent) fileSelectorComponent;

    constructor(private fileService: FileService, toastController: ToastController) {
        super(toastController);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    selectFile(fileLoader) {
        fileLoader.click();
        fileLoader.onchange = () => {
            const selectedFile = fileLoader.files[0];
            this.uploadFile(selectedFile);
        }
    }
    // upload file to  server
    uploadFile(selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        // upload file as formData
        this.fileService.uploadFile(formData,this.sessionId)
            .subscribe(() => {
                this.selectedFileName.emit('nothing');
                this.presentToast('ok');
            }, error => console.log(error))
    }



}
