
const userDoesNotExist = 'test@machbarschaft.jetzt';

module.exports = function(app) {

  /**
   * METHOD: PUT
   * URL: '/v1/admin/users/{email}'
   */
  app.put('/v1/admin/users/*', function (req, res) {
    const mail = req.params['0'];
    if (mail === userDoesNotExist) {
      res.status(404).send(`user ${userDoesNotExist} does not exist`);
    } else if (mail && mail.indexOf('@') > 0) {
      res.status(200).end();
    } else {
      res.status(404).end(`user ${mail} does not exist`);
    }
  });

}
