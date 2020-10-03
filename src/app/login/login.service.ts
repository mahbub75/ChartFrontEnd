import {Injectable} from '@angular/core';
import {LoginRepository} from './login-repository';
import {Observable} from 'rxjs';
import {User} from '../core/model/user';
import {CoreRepository} from '../core/core-repository';
import {Router} from '@angular/router';
import {UserPass} from '../core/model/user-pass';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private router: Router, private loginRepo: LoginRepository, private coreRepository: CoreRepository) {
    }

    login(userPass: UserPass):Observable<User> {
           return  this.loginRepo.login(userPass);
    }
}
