import { Injectable } from '@angular/core';
import {Lesson} from '../core/model/lesson';
import {LessonRepository} from './lesson-repository';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {


  constructor(private repo:LessonRepository) { }
  lessonList():Lesson[]{
    return this.repo.lessonList();
  }
}
