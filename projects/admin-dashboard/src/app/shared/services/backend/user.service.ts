import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../public-api';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  createUser(user: User) {
    return this.httpClient.post(this.apiUrl, user, { headers: super.createApiHeader() });
  }

  makeUserToAdmin(userId: string): Observable<any>{
    return this.httpClient.patch(`${this.apiUrl}v1/admin/users/${userId}`, {role: 'admin'}, { headers: super.createApiHeader() });
  }

}
