import {Router} from '@angular/router';
import {AuthService, MapsService, UserService} from '../shared/services/public-api';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GeoPoint, User} from '../shared/public-api';
import {BreakPointObserverService} from '../../../../style-lib/src/lib/services/break-point-observer.service';
import {StorageService} from '../shared/services/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  // for map
  showMap = false;
  mapCenter: google.maps.LatLngLiteral;
  markerTitle = 'Ihre Adresse?';
  // creating a user
  email = '';
  firstName = '';
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
  mapWidth: number;

  constructor(private authService: AuthService,
              private mapsService: MapsService,
              private userService: UserService,
              private storageService: StorageService,
              public breakpointObserver: BreakPointObserverService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.breakpointObserver.getIsMobile$()
      .subscribe(() => {
        this.mapWidth = window.innerWidth > 760 ? null : window.innerWidth - 60;
        this.changeDetectorRef.detectChanges();
      });
  }

  checkAddress(onRegistration?: boolean): void {
    this.mapsService.getAddress(this.address)
      .subscribe((response) => {
        if (response.status !== 'OK' || response.results.length === 0) {
          // handling wrong address
        } else {
          this.splitAddress(response.results[0].formatted_address);
          this.location = {
            latitude: response.results[0].geometry.location.lat,
            longitude: response.results[0].geometry.location.lng
          };
          if (onRegistration === undefined || onRegistration === false) {
            this.initializeMap();
          }
        }
      }, (error) => {
        // handling wrong address
        console.log(error);
      });
  }

  registration(): void {
    console.log('registration called');

    if (this.password === this.repeatPassword) {
      if (this.location === undefined || this.location === null) {
        this.checkAddress(true);
      }
      // registration in firebase
      this.authService.register(this.email, this.password)
        .then(() => {
          console.log('registration in firebase successful');
          this.authService.getToken().subscribe(
            (result) => {
              this.storageService.setItem('token', result);

              // if the registration in firebase was sucessful: register in backend
              const user: User = {
                email: this.email, firstName: this.firstName, lastName: this.lastName, phone: this.phoneNumber,
                location: this.location, city: this.city, zipCode: this.zipCode, street: this.street, streetNo: this.streetNo, source: 'APP'
              };
              this.userService.createUser(user)
                .subscribe((result2) => {
                  console.log(result2);
                  this.router.navigate(['login']).then();
                }, (error) => {
                  console.log(error);
                });
            });
        }).catch(
        (error) => {
          console.log(error);
        });
    }
  }

  private initializeMap(): void {
    console.log('lat' + this.location.latitude);
    this.mapCenter = {lat: this.location.latitude, lng: this.location.longitude};
    this.showMap = true;
  }

  // format: "street streetNo, zipCode city, Deutschland"
  private splitAddress(formattedAddress: string): void {
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
