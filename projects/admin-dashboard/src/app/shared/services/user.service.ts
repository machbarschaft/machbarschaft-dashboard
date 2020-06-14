import {Injectable} from '@angular/core';
import {User} from '../public-api';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  //url = 'http://service-api-ng.nightly.staging.colivery.app/v1/user';
  url = 'http://localhost:8080/v1/user';

  createUser(user: User) {
    return this.http.post(this.url, user, { headers: super.createApiHeader() });
  }

}
