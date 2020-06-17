import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Session} from '../../core/model/session';
import {Observable, Subscription} from 'rxjs';
import {LessonsService} from '../lessons.service';

@Component({
    selector: 'app-current-lesson',
    templateUrl: './current-lesson.component.html',
    styleUrls: ['./current-lesson.component.scss'],
})
export class CurrentLessonComponent implements OnInit {
    lessonId: string;
    sessions: Observable<Session[]>;
    subscription: Subscription[] = [];

    constructor(private lessonsService: LessonsService, private activatedRoute: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.sessionList();
    }

    sessionList() {
        this.sessions = this.activatedRoute.paramMap.pipe(
            switchMap(params => {
                this.lessonId = params.get('lessonId');
                return this.lessonsService.sessionList(this.lessonId)
            })
        )
    }

    goToSession(sessionId: string) {
        this.router.navigate(['lessons' + '/' + this.lessonId + '/' + 'session' + '/' + sessionId])
    }
}

export const CurrentLessonRoute = {path: '', component: CurrentLessonComponent};

