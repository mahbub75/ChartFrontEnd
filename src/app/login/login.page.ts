import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../core/service/authorization.service';
import {LoginService} from './login.service';
import {UserPass} from '../core/model/user-pass';
import {ModalController, ToastController} from '@ionic/angular';
import {BaseComponent} from '../core/component/BaseComponent/base.component';
import {map} from 'rxjs/operators';
import {User, UserRoll} from '../core/model/user';
import {Subscription} from 'rxjs';
import {CoreRepository} from '../core/core-repository';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [AuthorizationService, LoginService]
})
export class LoginPage extends BaseComponent implements OnInit {
    userPass = new UserPass();
    subscriptions: Subscription[] = [];

    constructor(toastController: ToastController, private router: Router, private authorizationService: AuthorizationService,
                private loginService: LoginService, private coreRepository: CoreRepository, private modalController:ModalController) {
        super(toastController);
    }

    ngOnInit() {
    }



    login() {
        this.subscriptions.push(this.loginService.login(this.userPass).pipe(map((res: User) => res))
            .subscribe(user => {
                    this.coreRepository.user = user;
                    if (user.roll === UserRoll.ADMIN) {
                        this.router.navigate(['users/admin']);
                    } else {
                        this.router.navigate(['sessions'], {queryParams: {userId: user.id}})
                    }
                }
            ))
    }
}
