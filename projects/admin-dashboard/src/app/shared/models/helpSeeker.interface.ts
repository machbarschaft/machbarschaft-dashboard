import {SOURCE, User} from './public-api';

export interface HelpSeeker {
  id?: string;
  fullName: string;
  phone: string;
  source: SOURCE;
  enteredBy?: string;
  user?: User;
}
