
module.exports = function(app) {

  /**
   * METHOD: PUT
   * URL: '/v1/admin/users/{email}'
   */
  app.put('/v1/admin/users/*', function (req, res) {
    const mail = req.params['0'];
    if (mail && mail.indexOf('@') > 0) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });

}
