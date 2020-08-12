import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {AuthenticationGuardService} from './authentication-guard.service';
import {Router} from '@angular/router';

export class RequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService,
              private authenticationGuardService: AuthenticationGuardService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // just update request for request that contain string v1 from our backend
    if (req.url.indexOf('v1') > -1) {
      // get token from local storage
      const token: string = localStorage.getItem('token');
      // get api url from environment
      const host: string = environment.apiUrl;
      // source url
      const source: string = environment.host;
      // close request and add request headers for content type and authorization
      // update url with host from environment
      const request = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .set(':scheme', 'https').set(':method', req.method)
          .set(':authority', environment.apiUrl.replace('https://', '').replace('/', ''))
          .set('origin', source)
          .set('pragma:', 'no-cache')
          .set('sec-fetch-dest:', 'empty')
          .set('sec-fetch-mode:', 'cors')
          .set('sec-fetch-site:', 'cross-site')
        ,
        url: `${host}${req.url}`,
      });
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            // user is unauthorized, has to be logged out and redirected to login
            localStorage.clear();
            this.authenticationGuardService.changeAuthenticated(false);
            this.router.navigate(['login']).then();
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

}
