import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Session} from '../core/model/session';
import {Lesson} from '../core/model/lesson';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from './session.service';
import {CoreRepository} from '../core/core-repository';
import {BaseComponent} from '../core/component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.page.html',
    styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage extends BaseComponent implements OnInit {
    sessions: Observable<Session[]>;
    subscriptions: Subscription[] = [];
    currentLesson = CoreRepository ? CoreRepository.user ? CoreRepository.user.lesson : null : null;

    constructor(toastController: ToastController, private activatedRoute: ActivatedRoute, private router: Router,
                private sessionService: SessionService, private route: ActivatedRoute) {
        super(toastController);
        this.route.queryParamMap
            .subscribe(params => {
                const userId = params.get('userId');
                this.sessionList(userId);
            });


    }

    ngOnInit() {

    }

    sessionList(userId: string) {

        this.sessions = this.sessionService.sessionList(userId)
    }

    goToSession(sessionId: string) {
        this.router.navigate(['sessions' + '/' + sessionId])
    }

    addNewSession() {
    }

}

export const SessionsPageRoute = {path: '', component: SessionsPage};