import {CoreRepository} from '../core/core-repository';
import {Observable} from 'rxjs';
import {User} from '../core/model/user';
import {map} from 'rxjs/operators';
import {UserPass} from '../core/model/user-pass';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginRepository extends CoreRepository {
    login(userPass:UserPass): Observable<User> {
        return this.post('login',userPass)
            .pipe(
                map(res => res as User)
            );
    }

}
