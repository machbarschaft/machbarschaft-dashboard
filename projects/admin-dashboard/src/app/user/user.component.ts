import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../shared/services/backend/user.service';
import {User} from '../shared/models/user.interface';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../style-lib/src/lib/services/break-point-observer.service';
import {MapsService} from '../shared/services/maps.service';
import {Address} from '../shared/models/address';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'mbs-ad-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AsyncPipe]
})
export class UserComponent implements OnInit {

  user: User;
  submitted: boolean = false;
  address: Address;
  success: boolean = false;
  updateFailed: boolean = false;

  showMap: boolean = false;
  mapCenter: google.maps.LatLngLiteral;
  mapWidth: number;
  markerTitle: string;
  addressNotFound: boolean = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,
              private mapsService: MapsService,
              public breakpointObserver: BreakPointObserverService,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.breakpointObserver.getIsMobile$()
      .subscribe(() => {
        this.mapWidth = window.innerWidth > 760 ? null : window.innerWidth - 60;
        this.changeDetectorRef.detectChanges();
      });

    this.userService.getUser()
      .subscribe((user: User) => {
        this.user = user;
        this.userForm.setValue({
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          address: `${user.street} ${user.streetNo} ${user.zipCode} ${user.city}`
        });
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.user = null;
        this.changeDetectorRef.detectChanges();
      });

    this.markerTitle = this.asyncPipe.transform(this.translateService.get('user.your-address'));
  }

  getAbstractControl(key: string): AbstractControl | null {
    return this.userForm.get(key);
  }

  saveChanges(): void {
    this.submitted = true;
    this.updateFailed = false;
    this.changeDetectorRef.detectChanges();

    if (this.userForm.valid) {
      const newUser: User = {
        city: this.address ? this.address.city : this.user.city,
        email: this.getAbstractControl('email').value,
        firstName: this.getAbstractControl('firstName').value,
        id: this.user.id,
        lastName: this.getAbstractControl('lastName').value,
        location: this.address ? this.address.location : this.user.location,
        phone: this.getAbstractControl('phone').value,
        source: this.user.source,
        street: this.address ? this.address.street : this.user.street,
        streetNo: this.address ? this.address.streetNo :  this.user.streetNo,
        zipCode: this.address ? this.address.zipCode :  this.user.zipCode
      };

      this.userService.updateUser(newUser)
        .subscribe(user => {
          if (user) {
            this.userForm.reset({
              email: user.email,
              phone: user.phone,
              firstName: user.firstName,
              lastName: user.lastName,
              address: `${user.street} ${user.streetNo} ${user.zipCode} ${user.city}`
            });
            this.submitted = false;
            this.addressNotFound = false;
            this.success = true;
            this.changeDetectorRef.detectChanges();
          }
        }, () => {
          this.updateFailed = true;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  checkAddress(): void {
    this.changeDetectorRef.detectChanges();
    this.mapsService.getAddress(this.getAbstractControl('address').value)
      .subscribe((response) => {
        if (response.status !== 'OK' || response.results.length === 0) {
          // handling wrong address
          this.addressNotFound = true;
          this.changeDetectorRef.detectChanges();
        } else {
          this.address = this.splitAddress(response.results[0].formatted_address, response.results[0].geometry.location);
          this.initializeMap();
        }
      }, (error) => {
        console.log('error');
        // handling wrong address
        console.log(error);
      });
  }

  private initializeMap(): void {
    this.mapCenter = {lat: this.address.location.latitude, lng: this.address.location.longitude};
    this.showMap = true;
    this.changeDetectorRef.detectChanges();
  }

  // format: "street streetNo, zipCode city, Deutschland"
  private splitAddress(formattedAddress: string, location: { lat: number, lng: number }): Address {
    const splitted = formattedAddress.split(' ', 5);

    for (let i = 0; i < splitted.length; i++) {
      splitted[i] = splitted[i].replace(',', '');
    }

    return {
      city: splitted[3],
      street: splitted[0],
      streetNo: splitted[1],
      zipCode: splitted[2],
      location: {
        latitude: location.lat,
        longitude: location.lng
      }
    };
  }


}
