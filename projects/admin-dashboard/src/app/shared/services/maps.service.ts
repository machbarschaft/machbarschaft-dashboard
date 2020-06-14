import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getAddress(addressString: string): Observable<any> {
    return this.http.get(`${environment.mapsUrl}?address=${addressString}&key=${environment.mapsKey}`);
  }

}
