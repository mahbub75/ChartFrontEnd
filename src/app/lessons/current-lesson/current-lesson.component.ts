import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Session} from '../../core/model/session';
import {Observable, Subscription} from 'rxjs';
import {LessonsService} from '../lessons.service';
import {SessionService} from '../session/session.service';
import {Lesson} from '../../core/model/lesson';

@Component({
    selector: 'app-current-lesson',
    templateUrl: './current-lesson.component.html',
    styleUrls: ['./current-lesson.component.scss'],
})
export class CurrentLessonComponent implements OnInit {
    lessonId: string;
    sessions: Observable<Session[]>;
    subscriptions: Subscription[] = [];
currentLesson:Lesson;

    constructor(private lessonsService: LessonsService, private activatedRoute: ActivatedRoute,
                private router: Router, private sessionService:SessionService) {

    }

    ngOnInit() {
        this.sessionList();
    }

    sessionList() {
        this.sessions = this.activatedRoute.paramMap.pipe(
            switchMap(params => {
                this.lessonId = params.get('lessonId');
                this.getLessonById(this.lessonId);
                return this.lessonsService.sessionList(this.lessonId)
            })
        )
    }

    getLessonById(lessonId:string){
        this.subscriptions.push(
            this.lessonsService.getLessonById(this.lessonId).subscribe(lesson=>{
                this.currentLesson =lesson
            })

        )
    }
    goToSession(sessionId: string) {
        this.router.navigate(['lessons' + '/' + this.lessonId + '/' + 'session' + '/' + sessionId])
    }

    addNewSession(){
    }



}

export const CurrentLessonRoute = {path: '', component: CurrentLessonComponent};

