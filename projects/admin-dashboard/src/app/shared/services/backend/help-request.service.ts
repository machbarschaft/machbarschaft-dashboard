import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelpRequest} from '../../models/helpRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  constructor(private httpClient: HttpClient) {}

  getHelpRequests() {
    return this.httpClient.get(`v1/help-request`);
  }

  getHelpRequest(orderId: string): Observable<any>{
    return this.httpClient.get(`v1/help-request/${orderId}`);
  }

  createHelpRequest(helpRequest: HelpRequest) {
    return this.httpClient.post(`v1/help-request`, helpRequest);
  }

}
