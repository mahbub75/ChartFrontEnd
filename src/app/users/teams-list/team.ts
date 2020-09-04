import {User, UserRoll} from '../../core/model/user';

export class Team extends User{
    password = '123456';
    roll = UserRoll.TEAM;
    members:string;
  centerId:string;
}
