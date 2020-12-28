import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelpRequest} from '../../models/helpRequest.interface';
import {REQUEST_STATUS} from '../../models/constants.interface';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  constructor(private httpClient: HttpClient) {}

  getHelpRequests(): Observable<HelpRequest[]> {
    return this.httpClient.get<HelpRequest[]>(`v1/help-request`);
  }

  getHelpRequest(orderId: string): Observable<HelpRequest>{
    return this.httpClient.get<HelpRequest>(`v1/help-request/${orderId}`);
  }

  createHelpRequest(helpRequest: HelpRequest): Observable<HelpRequest> {
    return this.httpClient.post<HelpRequest>(`v1/help-request`, helpRequest);
  }

  updateHelpRequestStatus(uuid: string, status: REQUEST_STATUS): Observable<HelpRequest> {
    return this.httpClient.put<HelpRequest>(`v1/help-request/${uuid}/status`, { status });
  }

  updateHelpRequest(uuid: string, helpRequest: HelpRequest): Observable<HelpRequest> {
    return this.httpClient.put<HelpRequest>(`v1/help-request/${uuid}`, helpRequest);
  }
}
