import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../core/service/authorization.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers:[AuthorizationService]
})
export class LoginPage implements OnInit {

    constructor(private router:Router,private authorizationService:AuthorizationService) {
    }

    ngOnInit() {
    }

    login() {

        this.authorizationService.loginStatus=true;
this.router.navigate(['lessons'])
    }
}
