import { Injectable } from '@angular/core';
import {User} from '../core/model/user';
import {UsersRepository} from './users-repository';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private usersRepository:UsersRepository) { }
  postNewTeam(newTeam:User){
return this.usersRepository.postNewTeam(newTeam)
  }
  deleteTeam(teamId:string){
    return this.usersRepository.deleteTeam(teamId);
  }
}
