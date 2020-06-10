import { Injectable } from '@angular/core';
import { User } from '../public-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = 'service-api-ng.nightly.staging.colivery.app/v1/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
      Authorization: 'Bearer: ' + localStorage.getItem('token')
    })
  };


  /*
  {
  "firstName": "string",
  "lastName": "string",
  "street": "string",
  "streetNo": "string",
  "zipCode": "string",
  "city": "string",
  "email": "string",
  "location": {
    "longitude": 0,
    "latitude": 0
  },
  "phone": "string",
  "source": "HOTLINE"
}
*/
  createUser(user: User) {
    return this.http.post(this.url, user, {});
  }
}
