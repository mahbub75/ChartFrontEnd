import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {MenuService} from './menu.service';
import {AuthorizationService} from '../core/service/authorization.service';
import {CoreRepository} from '../core/core-repository';
import {User} from '../core/model/user';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
    providers: [MenuService, AuthorizationService]
})

export class MenuPage implements OnInit {
    user = CoreRepository.user;
    subscriptions: Subscription[] = [];

    constructor(private menuService: MenuService, public authService: AuthorizationService, public coreRepository: CoreRepository) {
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

    logOut() {
        this.authService.logOut();
    }

    getUser() {
this.user = CoreRepository.user;
    }
}
