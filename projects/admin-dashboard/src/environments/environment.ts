export const environment = {
  production: false,
  firebaseConfig: JSON.stringify(process.env.FIREBASE_CONFIG_STA),
  mapsUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  mapsKey: JSON.stringify(process.env.MAPS_API_KEY),
  apiUrl: 'https://api-sta.machbarschaft.jetzt',
};
