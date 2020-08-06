import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from '../session.service';
import {ActivatedRoute} from '@angular/router';
import {Session} from '../../../core/model/session';
import {FileService} from '../files/file.service';
import {FileModel} from '../files/file-model';
import {FileListComponent} from '../files/file-list/file-list.component';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss'],
    providers: [SessionService, FileService]
})
export class SessionComponent implements OnInit, AfterViewInit {
    subscriptions: Subscription[] = [];
    sessionId: string;
    currentSession = new Session();
    selectedFileContent: object;
    files: FileModel[];

    constructor(private sessionService: SessionService, private activatedRoute: ActivatedRoute, private fileService: FileService) {
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
            this.files = session.files;
        });
    }


    fileContent(fileContent:object){
        this.selectedFileContent =fileContent
    }

    getAllFiles() {
        this.subscriptions.push(
            this.fileService.getFiles(this.sessionId).subscribe(files => {
                    this.files = files;
                }
            )
        )    }
}

export const SessionRoute = {path: '', component: SessionComponent}
