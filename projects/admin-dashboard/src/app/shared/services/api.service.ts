import {HttpHeaders} from '@angular/common/http';

export class ApiService {

  createApiHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }

}
