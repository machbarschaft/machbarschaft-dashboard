import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationGuardService} from '../services/authentication-guard.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationGuardService: AuthenticationGuardService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isAllowedTo = new ReplaySubject<boolean>(1);

    this.authenticationGuardService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        isAllowedTo.next(true);
        isAllowedTo.complete();
      } else {
        this.router.navigate(['/login']).then();
        isAllowedTo.next(false);
        isAllowedTo.complete();
      }
    });

    return isAllowedTo.asObservable();
  }

}
