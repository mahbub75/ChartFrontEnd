import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {MenuService} from './menu.service';
import {AuthorizationService} from '../core/service/authorization.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
  providers:[MenuService,AuthorizationService]
})

export class MenuPage implements OnInit {

    constructor(private menuController: MenuController,private menuService:MenuService,public authorizationService:AuthorizationService) {
    }

    ngOnInit() {
    }

}
