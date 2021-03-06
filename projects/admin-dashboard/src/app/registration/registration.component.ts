import {Router} from '@angular/router';
import {AuthService, MapsService, UserService} from '../shared/services/public-api';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GeoPoint, User} from '../shared/public-api';
import {BreakPointObserverService} from '../../../../style-lib/src/lib/services/break-point-observer.service';
import {StorageService} from '../shared/services/storage.service';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AsyncPipe]
})
export class RegistrationComponent implements OnInit {

  // for map
  showMap: boolean = false;
  mapCenter: google.maps.LatLngLiteral;
  markerTitle: string;
  // creating a user
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  street: string = '';
  streetNo: string = '';
  zipCode: string = '';
  city: string = '';
  password: string = '';
  repeatPassword: string = '';
  location: GeoPoint;
  address: any = '';
  mapWidth: number;

  constructor(private authService: AuthService,
              private mapsService: MapsService,
              private userService: UserService,
              private storageService: StorageService,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
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
    this.markerTitle = this.asyncPipe.transform(this.translateService.get('user.your-address'));
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
              localStorage.setItem('token', result);

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
