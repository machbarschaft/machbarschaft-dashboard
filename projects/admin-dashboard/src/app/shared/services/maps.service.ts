import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }
  url = 'https://maps.googleapis.com/maps/api/geocode/json';
  key = 'AIzaSyAcko48zKZnhBP1RBFlIz6DO4E_0zEF9GU';

  getAdress(adressString: string): Observable<any> {
    return this.http.get(`${this.url}?address=${adressString}&key=${this.key}`);
  }

}
