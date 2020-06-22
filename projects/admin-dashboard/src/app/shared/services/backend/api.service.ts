import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class ApiService {

  apiUrl: string;

  constructor(httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  createApiHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }

}
