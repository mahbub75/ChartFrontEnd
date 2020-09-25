import {Component, OnInit} from '@angular/core';
import {MenuController, ToastController} from '@ionic/angular';
import {MenuService} from './menu.service';
import {AuthorizationService} from '../core/service/authorization.service';
import {CoreRepository} from '../core/core-repository';
import {User} from '../core/model/user';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BaseComponent} from '../core/component/BaseComponent/base.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
    providers: [MenuService, AuthorizationService]
})

export class MenuPage extends BaseComponent implements OnInit {
    user = CoreRepository.user;
    subscriptions: Subscription[] = [];

    constructor(toastController: ToastController, public authService: AuthorizationService, public coreRepository: CoreRepository,) {
        super(toastController);
    }

    ngOnInit() {
        this.subscriptions.push(
            this.coreRepository.asyncUser
                .pipe(
                    filter(res => res != null),
                ).subscribe(list => {
                    this.getUser();
                }
            )
        );
    }

    async logOut() {
        await this.authService.logOut();
    }

    getUser() {
        this.user = CoreRepository.user;
    }
}
