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
    this.mapsService.getAdress(this.address)
      .subscribe((response) => {
        if (response.status !== 'OK' || response.results.length === 0) {
          // handling worng adress
        } else {
          console.log(response);
          console.log(response.results[0].formatted_address);
          this.splitAdress(response.results[0].formatted_address);
        }

      }, (error) => {
        // handling wrong adress
        console.log(error);
      });
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

  // format: "street streetNo, zipCode city, Deutschland"
  splitAdress(formattedAddress: string) {
    const splitted = formattedAddress.split(' ', 5);

    for (let i = 0; i < splitted.length; i++) {
      splitted[i] = splitted[i].replace(',', '');
    }
    this.street = splitted[0];
    this.streetNo = splitted[1];
    this.zipCode = splitted[2];
    this.city = splitted[3];
  }

}
