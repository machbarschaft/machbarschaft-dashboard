const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        firebaseConfig: JSON.stringify(process.env.FIREBASE_CONFIG_STA),
        mapsKey: JSON.stringify(process.env.MAPS_API_KEY),
      },
    }),
  ],
};
