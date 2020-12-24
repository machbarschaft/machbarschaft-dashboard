export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  },
  mapsUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  mapsKey: process.env.MAPS_API_KEY,
  apiUrl: `https://${process.env.API_URL_SUB}.machbarschaft.jetzt`,
};
