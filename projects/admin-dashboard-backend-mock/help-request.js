const data = require('./data');

module.exports = function(app) {
  /**
   * METHOD: GET
   * URL: '/v1/help-request/
   */
  app.get('/v1/help-request', function(req, res) {
    res.send(data.getHelpRequests());
  });
  /**
   * METHOD: GET
   * URL: '/v1/help-request/{uuid}
   */
  app.get('/v1/help-request/*', function(req, res) {
    const uuid = req.params['0'];
    const helpRequest = data.getHelpRequest(uuid);
    if (helpRequest) {
      res.send(helpRequest);
    } else {
      res.status(404).end();
    }
  });
  /**
   * METHOD: POST
   * BODY: { requestText: 'text', requestStatus: 'status', adminUser: 'adminUser' }
   * URL: '/v1/help-request/
   */
  app.post('/v1/help-request', function(req, res) {
    const requestText = req.body['requestText'];
    let requestStatus = req.body['requestStatus'];
    const adminUser = req.body['adminUser'];
    const helpSeeker = req.body['helpSeeker'];

    if (!!requestStatus) {
      requestStatus = 'OPEN';
    }

    if (requestText && helpSeeker) {
      const helpRequest = data.createHelpRequest(requestStatus, requestText, adminUser, helpSeeker);
      res.status(201);
      res.send(helpRequest);
    } else {
      res.status(400).end();
    }
  });
  /**
   * METHOD: PUT
   * BODY: { requestText: 'text', helpSeeker: {} }
   * URL: '/v1/help-request/{uuid}
   */
  app.put('/v1/help-request/*', function(req, res) {
    const uuid = req.params['0'];
    const requestText = req.body['requestText'];
    const helpSeeker = req.body['helpSeeker']
    if (requestText && helpSeeker) {
      const helpRequest = data.getHelpRequest(uuid);
      if (helpRequest) {
        helpRequest.requestText = requestText;
        helpRequest.helpSeeker = helpSeeker;
        res.send(helpRequest);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(400).end();
    }
  });
  /**
   * METHOD: PUT
   * BODY: { status: 'OPEN' }
   * URL: '/v1/help-request/{uuid}/status
   */
  app.put('/v1/help-request/:uuid/status', function(req, res) {
    const uuid = req.params['uuid'];
    const status = req.body['status'];
    console.log('status', status, 'uuid', uuid);
    if (status) {
      const helpRequest = data.getHelpRequest(uuid);
      if (helpRequest) {
        helpRequest.requestStatus = status;
        res.send(helpRequest);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(400).end();
    }
  });
};
