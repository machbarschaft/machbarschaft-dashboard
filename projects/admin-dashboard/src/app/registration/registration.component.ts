import { MapsService } from './../shared/services/maps.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/public-api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService, private mapsService: MapsService) { }

  email = '';
  firstname = '';
  secondNmae = '';
  number = '';
  street = '';
  streetNo = '';
  updatedAt = '';
  zipCode = '';
  city = '';
  password = '';
  repeatPassword = '';


  address = '';






  ngOnInit(): void {
  }

  /*
  city: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  location: GeoPoint;
  locationGeoHash: string;
  phone: string;
  source: SOURCE;
  street: string;
  streetNo: string;
  updatedAt: string;
  zipCode: string;
  */


  checkAdress() {
    this.mapsService.getAdress(this.address);
  }

  registration() {
    if (this.password === this.repeatPassword) {
      this.authService.register(this.email, this.password)
      .then((response) => {
        // const user: User = {city: this.city, };

      }).catch(
        (error) => {

      });
    }
  }

}
