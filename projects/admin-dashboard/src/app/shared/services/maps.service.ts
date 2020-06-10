import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }
  url = 'https://maps.googleapis.com/maps/api/geocode/json';
  key = 'AIzaSyAxdml0SDGrLHMNW024k1KUG8SvVuaOuVg';

  getAdress(adressString: string) {
    return this.http.get(`${this.url}?address=${adressString}&key=${this.key}`);
  }

}
