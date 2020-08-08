import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../public-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User) {
    return this.httpClient.post('', user);
  }

  makeUserToAdmin(userId: string): Observable<any>{
    return this.httpClient.patch(`v1/admin/users/${userId}`, {role: 'admin'});
  }

}
