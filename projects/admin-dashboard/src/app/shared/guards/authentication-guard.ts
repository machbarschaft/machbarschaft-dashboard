import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticationGuardService} from '../services/authentication-guard.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationGuardService: AuthenticationGuardService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationGuardService.isAuthenticated();
  }

}
