import { Observable } from 'rxjs';
import { UserService } from './../shared/services/user.service';
import { MapsService } from './../shared/services/maps.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User, GeoPoint } from '../shared/public-api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService, private mapsService: MapsService, private userService: UserService) { }


  // for map
  showMap = false;
  mapCenter: google.maps.LatLngLiteral;
  markerTitle = 'Ihre Adresse?';
  // creating a user
  email = '';
  firstname = '';
  lastName = '';
  phoneNumber = '';
  street = '';
  streetNo = '';
  updatedAt = '';
  zipCode = '';
  city = '';
  password = '';
  repeatPassword = '';
  location: GeoPoint;


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


  checkAdress(onRegistration?: boolean) {
    this.mapsService.getAdress(this.address)
      .subscribe((response) => {
        if (response.status !== 'OK' || response.results.length === 0) {
          // handling wrong address
        } else {
          this.splitAdress(response.results[0].formatted_address);
          this.location = {
            latitude: response.results[0].geometry.location.lat,
            longitude: response.results[0].geometry.location.lng
          };
          if (onRegistration === undefined || onRegistration === false) {
            this.initalizeMap();
          }
        }
      }, (error) => {
        // handling wrong address
        console.log(error);
      });
  }

  registration() {
    console.log('registration called');

    if (this.password === this.repeatPassword) {
      if (this.location === undefined || this.location === null) {
        this.checkAdress(true);
      }
      // registration in firebase
      this.authService.register(this.email, this.password)
        .then((response) => {
          console.log('registration in firebase successful', response);
          // if the registration in firebase was sucessful: register in backend

          const user: User = {
            email: this.email, firstName: this.firstname, lastName: this.lastName, phone: this.phoneNumber,
            location: this.location, city: this.city, zipCode: this.zipCode, street: this.street, streetNo: this.streetNo, source: 'APP'
          };
          this.userService.createUser(user)
            .subscribe((result => {
              console.log(result);
            }));

        }).catch(
          (error) => {
            console.log(error);
          });
    }
  }


  initalizeMap() {
    this.mapCenter = {lat: this.location.latitude, lng: this.location.longitude};
    this.showMap = true;
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
