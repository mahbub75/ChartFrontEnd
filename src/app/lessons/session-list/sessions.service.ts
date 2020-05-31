import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Session} from '../../core/model/session';
import {LessonRepository} from '../lesson-repository';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private lessonRepository:LessonRepository) { }

  sessionList(lessonId:string): Observable<Session[]>{
    return this.lessonRepository.sessionList(lessonId);
  }
}
