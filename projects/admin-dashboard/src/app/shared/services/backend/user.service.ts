import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../public-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>('v1/user/', user);
  }

  makeUserToAdmin(email: string): Observable<any>{
    return this.httpClient.put(`v1/admin/users/${email}`, {});
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>('v1/user', user);
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>('v1/user');
  }

}
