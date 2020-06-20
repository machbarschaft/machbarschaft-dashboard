const data = require('./data');

module.exports = function(app) {
  /**
   * METHOD: GET
   * URL: '/v1/help-seeker/
   */
  app.get('/v1/help-seeker', function(req, res) {
    res.send(data.getHelpSeekers());
  });
  /**
   * METHOD: GET
   * URL: '/v1/help-seeker/{uuid}
   */
  app.get('/v1/help-seeker/*', function(req, res) {
    const uuid = req.params['0'];
    const helpSeeker = data.getHelpSeeker(uuid);
    if (helpSeeker) {
      res.send(helpSeeker);
    } else {
      res.status(404).end();
    }
  });
  /**
   * METHOD: POST
   * BODY: { fullName: 'name', phone: 'phone', source: 'source', enteredBy: 'enteredBy' }
   * URL: '/v1/help-seeker/
   */
  app.post('/v1/help-seeker', function(req, res) {
   const fullName = req.body['fullName'];
   const phone = req.body['phone'];
   const source = req.body['source'];
   const enteredBy = req.body['enteredBy'];

    if (fullName && phone && source && enteredBy) {
      const helpRequest = data.createHelpSeeker(fullName, phone, source, enteredBy);
      res.status(201);
      res.send(helpRequest);
    } else {
      res.status(400).end();
    }
  });
};
