import {Injectable} from '@angular/core';
import {LoginRepository} from './login-repository';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {User, UserRoll} from '../core/model/user';
import {CoreRepository} from '../core/core-repository';
import {Router} from '@angular/router';
import {UserPass} from '../core/model/user-pass';
import {error} from '@angular/compiler/src/util';
import {BasicClass} from '../core/classes/basic-class';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    subscription: Subscription[] = [];

    constructor(private router: Router, private loginRepo: LoginRepository, private coreRepository: CoreRepository) {
    }

    login(userPass: UserPass):Observable<User> {
           return  this.loginRepo.login(userPass);
    }
}
