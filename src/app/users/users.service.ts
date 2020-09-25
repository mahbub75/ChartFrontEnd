import { Injectable } from '@angular/core';
import {User} from '../core/model/user';
import {UsersRepository} from './users-repository';
import {Team} from './teams-list/team';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private usersRepository:UsersRepository) { }
  getTeamListByCenterIdAndLessonId(adminId:string,lessonId:string){
   return  this.usersRepository.getTeamListByCenterIdAndLessonId(adminId,lessonId);
  }
  postNewTeam(newTeam:User,lessonId:string){
return this.usersRepository.postNewTeam(newTeam,lessonId)
  }

  cumulativeRegistration(formData:FormData){
   return  this.usersRepository.cumulativeRegistration(formData);
  }
  deleteTeam(teamId:string){
    return this.usersRepository.deleteTeam(teamId);
  }
  deleteAllTeams(){
   return  this.usersRepository.deleteAllTeams();
  }
  editTeam(team:Team){
   return  this.usersRepository.editTeam(team);
  }
}
