import {Injectable} from '@angular/core';
import {Lesson} from '../core/model/lesson';
import {LessonRepository} from './lesson-repository';
import {Observable} from 'rxjs';
import {CoreRepository} from '../core/core-repository';
import {Session} from '../core/model/session';

@Injectable({
    providedIn: 'root'
})
export class LessonsService {


    constructor(private lessonRepo: LessonRepository) {
    }
    sessionList(lessonId:string): Observable<Session[]>{
        return this.lessonRepo.sessionList(lessonId);
    }
    get lessonList(): Observable<Lesson[]> {
        const userId = CoreRepository.userId;
        return this.lessonRepo.lessonList(userId);
    }

    getLessonById(lessonId:string): Observable<Lesson>{
        return this.lessonRepo.getLessonById(lessonId)
    }
}
