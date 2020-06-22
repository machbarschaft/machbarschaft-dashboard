import {REQUEST_STATUS} from './public-api';

export interface HelpRequest {
  requestText: string;
  requestStatus: REQUEST_STATUS;
  adminUser: string;
}
