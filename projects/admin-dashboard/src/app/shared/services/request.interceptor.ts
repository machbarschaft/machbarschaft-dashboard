import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export class RequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('v1') > -1) {
      const token = localStorage.getItem('token');
      const host = environment.apiUrl;
      const request = req.clone({
        headers: req.headers.set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`),
        url: `${host}${req.url}`
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }

}
