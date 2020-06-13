import { Injectable } from '@angular/core';
import { User } from '../public-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //url = 'http://service-api-ng.nightly.staging.colivery.app/v1/user';
  url = 'http://localhost:8080/v1/user'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
      Authorization: 'Bearer: ' + localStorage.getItem('token')
    })
  };

  createUser(user: User) {
    console.log("user:" + user);
    return this.http.post(this.url, user, this.httpOptions);
  }

}
