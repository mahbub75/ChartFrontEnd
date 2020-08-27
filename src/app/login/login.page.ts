import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../core/service/authorization.service';
import {LoginService} from './login.service';
import {UserPass} from '../core/model/user-pass';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [AuthorizationService, LoginService]
})
export class LoginPage implements OnInit {
userPass=new UserPass();
    constructor( private authorizationService: AuthorizationService, private loginService: LoginService) {
    }

    ngOnInit() {
    }

  login() {
      this.loginService.login(this.userPass);
    }
}
