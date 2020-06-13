export type SOURCE = 'HOTLINE' | 'APP';
export type STATUS = 'TO_BE_DELIVERED' | 'DELIVERED' | 'CONSUMER_CANCELLED' | 'ACCEPTED';
export type LOGIN_ERROR = 'EMAIL_OR_PASSWORD_INVALID' | 'NETWORK' | 'OTHER';

export enum LOGIN_ERROR_ENUM {
  'EMAIL_OR_PASSWORD_INVALID' = 'EMAIL_OR_PASSWORD_INVALID',
  'NETWORK'  = 'NETWORK' ,
  'OTHER' = 'OTHER'
}

export enum FIREBASE_LOGIN_ERROR_ENUM {
  'EMAIL_NOT_FOUND' = 'auth/user-not-found',
  'INVALID_PASSWORD' = 'auth/wrong-password',
  'NETWORK'  = 'auth/network-request-failed' ,
  'OTHER' = 'OTHER'
}

