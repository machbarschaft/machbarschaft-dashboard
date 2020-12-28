const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        API_URL_SUB: JSON.stringify(process.env.API_URL_SUB),
        MAPS_API_KEY: JSON.stringify(process.env.MAPS_API_KEY),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
      },
    }),
  ],
};
