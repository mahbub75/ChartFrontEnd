import {Component, OnInit} from '@angular/core';
import {LessonsService} from './lessons.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Lesson} from '../core/model/lesson';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-lessons',
    templateUrl: './lessons.page.html',
    styleUrls: ['./lessons.page.scss'],
    providers: [LessonsService]
})
export class LessonsPage implements OnInit {
    lessonList: Lesson[];
    subscription:Subscription[] = [] ;
    constructor(private lessonsService: LessonsService, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.lessons();
    }

    lessons() {
        this.subscription.push(this.lessonsService.lessonList.subscribe(
            lessons => this.lessonList = lessons
        ));
    }

    goToLesson(lessonId: string) {
        this.router.navigate(['lessons'+'/'+'sessions'+'/'+lessonId])
    }
}
