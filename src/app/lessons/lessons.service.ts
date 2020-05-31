import {Injectable} from '@angular/core';
import {Lesson} from '../core/model/lesson';
import {LessonRepository} from './lesson-repository';
import {Observable} from 'rxjs';
import {CoreRepository} from '../core/core-repository';

@Injectable({
    providedIn: 'root'
})
export class LessonsService {


    constructor(private lessonRepo: LessonRepository) {
    }

    get lessonList(): Observable<Lesson[]> {
        const userId = CoreRepository.userId;
        return this.lessonRepo.lessonList(userId);
    }
}
