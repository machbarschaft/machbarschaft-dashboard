import {GeoPoint} from './geo.interface';

export interface Address {
  city: string;
  street: string;
  streetNo: string;
  zipCode: string;
  location?: GeoPoint;
}
