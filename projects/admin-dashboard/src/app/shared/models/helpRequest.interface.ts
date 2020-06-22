import {REQUEST_STATUS, User} from './public-api';

export interface HelpRequest {
  id?: string;
  requestText: string;
  requestStatus: REQUEST_STATUS;
  adminUser: User | any;
  createdAt?: string;
  updatedAt?: string;
}
