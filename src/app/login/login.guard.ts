import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from '../core/service/authorization.service';

@Injectable()
export class LoginGuard implements CanLoad {
  constructor(private router:Router, private authorizationService:AuthorizationService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authorizationService.isLoggedIn){
      return true
    } else {
      this.router.navigate(['lessons'])
      return false
    };
  }

}
