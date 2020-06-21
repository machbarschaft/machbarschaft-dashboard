import { STATUS } from './public-api';



export interface HelpRequest {
  requestText: string;
  requestStatus: STATUS;
  adminUser: string;
}

