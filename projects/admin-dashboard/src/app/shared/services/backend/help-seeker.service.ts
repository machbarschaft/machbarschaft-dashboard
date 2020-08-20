import {HelpSeeker} from '../../models/helpSeeker.interface';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpSeekerService {

  constructor(private httpClient: HttpClient) {}

  getHelpSeekers() {
    return this.httpClient.get(`v1/help-seeker`);
  }

  getHelpSeeker(userId: string): Observable<any>{
    return this.httpClient.get(`v1/help-seeker/${userId}`);
  }

  createHelpSeeker(helpSeeker: HelpSeeker) {
    return this.httpClient.post(`v1/help-seeker`, helpSeeker);
  }

}
