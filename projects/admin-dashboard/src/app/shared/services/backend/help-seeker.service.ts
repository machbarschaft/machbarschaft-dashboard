import {HelpSeeker} from '../../models/helpSeeker.interface';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HelpSeekerService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getHelpSeekers() {
    // return this.httpClient.get(`${environment.apiUrl}/v1/help-seeker`, { headers: super.createApiHeader() });
    return this.httpClient.get(`${this.apiUrl}v1/help-seeker`, { headers: super.createApiHeader() });
  }

  getHelpSeeker(userId: string): Observable<any>{
    // return this.httpClient.get(`${environment.apiUrl}/v1/help-seeker/${userId}`, { headers: super.createApiHeader() });
    return this.httpClient.get(`${this.apiUrl}v1/help-seeker/${userId}`, { headers: super.createApiHeader() });
  }

  postHelpRequest(helpSeeker: HelpSeeker) {
    // return this.httpClient.post(`${environment.apiUrl}/v1/help-seeker`, order, { headers: super.createApiHeader() });
    return this.httpClient.post(`${this.apiUrl}v1/help-seeker`, helpSeeker, { headers: super.createApiHeader() });
  }

}
