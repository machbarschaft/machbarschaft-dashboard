const data = require('./data');

function handleUser(req) {
  const firstName = req.body['firstName'];
  const lastName = req.body['lastName'];
  const street = req.body['street'];
  const streetNo = req.body['streetNo'];
  const zipCode = req.body['zipCode'];
  const city = req.body['city'];
  const email = req.body['email'];
  const location = req.body['location'];
  const phone = req.body['phone'];
  const source = req.body['source'];

  if (firstName && lastName && street && streetNo && zipCode &&
    city && email && location && phone && source) {
    return data.createUser(firstName, lastName, street, streetNo, zipCode,
      city, email, location, phone, source);
  }
  return null;
}

module.exports = function(app) {

  /**
   * METHOD: GET
   * URL: '/v1/user/'
   */
  app.get('/v1/user', function(req, res) {
    const user = data.createUser('Max', 'Mustermann', 'Musterstraße', '1', '12345',
      'Musterstadt', 'max@mustermann.de', { latitude: 0, longitude: 0},'01601234567', 'APP')
    res.status(200);
    res.send(user);
  });

  /**
   * METHOD: PUT
   * BODY: {  }
   * URL: '/v1/user/'
   */
  app.put('/v1/user', function(req, res) {
    const user = handleUser(req);

    if (user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(400).end();
    }
  });

  /**
   * METHOD: POST
   * BODY: {  }
   * URL: '/v1/user/'
   */
  app.post('/v1/user', function(req, res) {
    const user = handleUser(req);

    if (user) {
      res.status(201);
      res.send(user);
    } else {
      res.status(400).end();
    }
  });

}
