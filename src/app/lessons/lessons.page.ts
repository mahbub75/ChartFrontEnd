import { Component, OnInit } from '@angular/core';
import {LessonsService} from './lessons.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Lesson} from '../core/model/lesson';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
  providers:[LessonsService]
})
export class LessonsPage implements OnInit {
  subscriptions: Subscription[] = [];
  constructor(private lessonsService:LessonsService,private router:Router,private http:HttpClient) { }

  ngOnInit() {
    this.subscriptions.push(
        this.http.get('http://localhost:8080/users').subscribe(()=>{

        },error => {
          console.log(error)
        })
    )

  }
  get labList(): Lesson[]{
    return this.lessonsService.labsList();
  }
  goToLesson(path:string){
    this.router.navigate(['lessons/'+path])
  }
}
