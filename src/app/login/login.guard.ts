import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from '../core/service/authorization.service';
import {UserRoll} from '../core/model/user';
import {CoreRepository} from '../core/core-repository';

@Injectable()
export class LoginGuard implements CanLoad {
  constructor(private router:Router, private authorizationService:AuthorizationService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authorizationService.isLoggedIn){
      return true
    } else {
      if (CoreRepository.user.roll === UserRoll.ADMIN) {
        this.router.navigate(['users/admin']);
      } else {
        this.router.navigate(['sessions'], {queryParams: {userId: CoreRepository.userId}})
      }
      return false
    };
  }

}
