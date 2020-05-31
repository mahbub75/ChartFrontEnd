import {CoreRepository} from '../core/core-repository';
import {Injectable} from '@angular/core';
import {Lesson} from '../core/model/lesson';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Session} from '../core/model/session';

@Injectable({
    providedIn: 'root'
})

export class LessonRepository extends CoreRepository {

    lessonList(userId: string): Observable<Lesson[]> {
        return this.get('user/' + userId + '/lessons').pipe(map(res => (res as Lesson[])));
    }
    sessionList(lessonId: string): Observable<Session[]> {
        return this.get('lesson/' + lessonId + '/sessions').pipe(map(res => (res as Session[])))
    }
}
