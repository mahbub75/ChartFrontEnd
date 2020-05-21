import {CoreRepository} from '../core/core-repository';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LessonRepository extends CoreRepository{

    lessonList() {
        return [];
    }
}
