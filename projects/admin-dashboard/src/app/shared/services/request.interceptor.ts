import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export class RequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // just update request for request that contain string v1 from our backend
    if (req.url.indexOf('v1') > -1) {
      // get token from local storage
      const token = localStorage.getItem('token');
      // get api url from environmewnt
      const host = environment.apiUrl;
      // close request and add request headers for content type and authorization
      // update url with host from environment
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
