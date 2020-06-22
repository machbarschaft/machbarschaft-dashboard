import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {HelpRequest} from '../../models/helpRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  baseUrl = 'http://localhost:3000/';

  getHelpRequests() {
    // return this.httpClient.get(`${environment.apiUrl}v1/help-request`, { headers: super.createApiHeader() });
    return this.httpClient.get(`${this.baseUrl}v1/help-request`, { headers: super.createApiHeader() });
  }

  getHelpRequest(orderId: string): Observable<any>{
    // return this.httpClient.get(`${environment.apiUrl}v1/help-request/${orderId}`, { headers: super.createApiHeader() });
    return this.httpClient.get(`${this.baseUrl}v1/help-request/${orderId}`, { headers: super.createApiHeader() });
  }

  postHelpRequest(helpRequest: HelpRequest) {
    // return this.httpClient.post(`${environment.apiUrl}v1/help-request`, order, { headers: super.createApiHeader() });
    return this.httpClient.post(`${this.baseUrl}v1/help-request`, helpRequest, { headers: super.createApiHeader() });
  }

}
