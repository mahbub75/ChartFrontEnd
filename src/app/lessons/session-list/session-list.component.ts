import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Session} from '../../core/model/session';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {SessionsService} from './sessions.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
  providers: [SessionsService]
})
export class SessionListComponent implements OnInit {

  sessionList: Observable<Session[]>;
  subscription :Subscription[]=[];
  constructor(public sessionService: SessionsService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.sessions();
  }


  sessions() {
    this.sessionList = this.activatedRoute.paramMap.pipe(
        switchMap(params=>{const lessonId=params.get('lessonId');
          return this.sessionService.sessionList(lessonId)})
    )
  }

}

export const SessionsPath = 'sessions';
export const SessionsRoute = {path:SessionsPath + '/:lessonId', component:SessionListComponent};
