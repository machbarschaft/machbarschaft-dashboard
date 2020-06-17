import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../public-api';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  // url = 'http://service-api-ng.nightly.staging.colivery.app/v1/user';
  url = 'http://localhost:8080/v1/user';

  createUser(user: User) {
    return this.httpClient.post(this.url, user, { headers: super.createApiHeader() });
  }

  makeUserToAdmin(userId: string): Observable<any>{
    return this.httpClient.patch(`${environment.apiUrl}v1/admin/users/${userId}`, {role: 'admin'}, { headers: super.createApiHeader() });

  }

}
