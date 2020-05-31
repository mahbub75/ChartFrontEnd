import {Injectable} from '@angular/core';
import {LoginRepository} from './login-repository';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../core/model/user';
import {CoreRepository} from '../core/core-repository';
import {Router} from '@angular/router';
import {UserPass} from '../core/model/user-pass';
import {error} from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    subscription: Subscription[] = [];

    constructor(private router: Router, private loginRepo: LoginRepository, private coreRepository: CoreRepository) {
    }

    login(userPass: UserPass) {
        this.subscription.push(
            this.loginRepo.login(userPass).pipe(map((res: User) => res))
                .subscribe(user => {
                    this.coreRepository.user = user;
                    this.router.navigate(['lessons']);
                },msg =>{
                    console.log(msg)
                    }
                ))

    }
}
