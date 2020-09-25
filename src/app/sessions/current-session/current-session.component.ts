import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from '../session.service';
import {ActivatedRoute} from '@angular/router';
import {Session} from '../../core/model/session';
import {FileService} from '../../core/files/file.service';
import {FileModel} from '../../core/files/file-model';
import {FileListComponent} from '../../core/files/file-list/file-list.component';
import {BaseComponent} from '../../core/component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';


@Component({
    selector: 'app-session',
    templateUrl: './current-session.component.html',
    styleUrls: ['./current-session.component.scss'],
    providers: [SessionService, FileService]
})
export class CurrentSessionComponent extends BaseComponent implements OnInit, AfterViewInit {
    subscriptions: Subscription[] = [];
    sessionId: string;
    currentSession = new Session();
    selectedFile: FileModel;
    files: FileModel[];

    constructor(toastController: ToastController, private sessionService: SessionService,
                private activatedRoute: ActivatedRoute, private fileService: FileService) {
        super(toastController);
    }

    @ViewChild(FileListComponent) fileListComponent;

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(param => {
            this.sessionId = param.get('sessionId');
            this.getCurrentSession(this.sessionId);
            this.getAllFiles()
        })
    }

    ngAfterViewInit() {
    }

    getCurrentSession(sessionId: string) {
        this.sessionService.getSession(sessionId).subscribe(session => {
            this.currentSession = session;
        });
    }


    fileContent(file: FileModel) {
        this.selectedFile = file
    }

    getAllFiles() {
        this.subscriptions.push(
            this.fileService.getFiles(this.sessionId).subscribe(files => {
                    this.files = files;
                }
            )
        )
    }
}

export const CurrentSessionRoute = {path: '', component: CurrentSessionComponent}
