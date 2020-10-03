import { Injectable } from '@angular/core';
import {SessionRepository} from './session-repository';
import {Observable} from 'rxjs';
import {Session} from '../core/model/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private sessionRepository:SessionRepository) { }

  getSession(sessionId: string):Observable<Session> {
    return this.sessionRepository.getSession(sessionId);
  }

  sessionList(userId:string): Observable<Session[]>{
    return this.sessionRepository.sessionList(userId);
  }
}
