import {User, UserRoll} from '../../core/model/user';

export class Admin extends User{
password='12345678';
    roll:UserRoll.ADMIN;
}
