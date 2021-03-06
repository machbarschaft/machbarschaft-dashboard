import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationGuardService } from './authentication-guard.service';
import { StorageService } from './storage.service';

export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private authenticationGuardService: AuthenticationGuardService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // just update request for request that contain string v1 from our backend
    if (req.url.indexOf('v1') > -1) {
      // get token from local storage
      const token: string = localStorage.getItem('token');
      // get api url from environment
      const host: string = environment.apiUrl;
      // close request and add request headers for content type and authorization
      // update url with host from environment
      const request = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
        url: `${host}/${req.url}`,
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
            this.router
              .navigate(['/login'], {
                queryParams: { message: 'unauthorized' },
              })
              .then();
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
