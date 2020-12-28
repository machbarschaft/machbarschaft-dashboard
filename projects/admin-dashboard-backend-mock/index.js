const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// see: http://johnzhang.io/options-request-in-express
// necessary changes for preflight requests in angular with options
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.status(200);
    res.send('OK');
  }
  else {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.indexOf('Bearer ') === 0 &&
        authorizationHeader.replace('Bearer ', '') !== 'null' &&
        authorizationHeader.replace('Bearer ', '') !== 'undefined') {
      //move on
      next();
    } else {
      res.status(401);
      res.send();
    }
  }
});

app.listen(3000, () =>
  console.log('Starting mock-server on port 3000!'),
);

require('./help-request')(app);
require('./help-seeker')(app);
require('./user')(app);
require('./admin')(app);

app.get('/', (req, res) => {
  res.send('hello world');
});

