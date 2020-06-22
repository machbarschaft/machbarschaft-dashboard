import {SOURCE} from './public-api';

export interface HelpSeeker {
  fullName: string;
  phone: string;
  source: SOURCE;
  enteredBy: string;
}
