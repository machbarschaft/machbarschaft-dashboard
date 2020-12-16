export const environment = {
  production: true,
  firebaseConfig: JSON.stringify(process.env.FIREBASE_CONFIG_PRD),
  mapsUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  mapsKey: JSON.stringify(process.env.MAPS_API_KEY),
  apiUrl: 'https://api.machbarschaft.jetzt/',
};
