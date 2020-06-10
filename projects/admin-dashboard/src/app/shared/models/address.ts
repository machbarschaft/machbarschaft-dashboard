export interface Location {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
  location: Location;
}
