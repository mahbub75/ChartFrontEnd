import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {MenuService} from './menu.service';
import {AuthorizationService} from '../core/service/authorization.service';
import {CoreRepository} from '../core/core-repository';
import {User} from '../core/model/user';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
  providers:[MenuService,AuthorizationService]
})

export class MenuPage implements OnInit {
user=new User();
    constructor(private menuService:MenuService,public authService:AuthorizationService) {
    }

    ngOnInit() {
        this.user=CoreRepository.user;
    }

    logOut() {
        this.authService.logOut();
    }
}
