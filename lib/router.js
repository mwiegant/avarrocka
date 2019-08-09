(function (module) {
  var sqlClient = require('./sql-client.js');
  var express = require('express');
  var path = require('path');
  var router = express.Router();

  router.get(['/favicon.ico'], function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  });

  router.get('/getAllAliveUnits', function(req, res) {
    sqlClient.getAllAliveUnits(function(units) {
      res.json(units);
    });
  });

  /* For security purposes, error out any remaining GET requests */
  router.get('*', function (req, res) {
    var filepath = path.join(__dirname, '../public/error.html');

    res.status(404);
    res.sendFile(filepath, {}, function (err) {
      if (err) {
        console.error(`error retrieving file at path: ${filepath}`);
      }
    });
  });

  module.exports = router;

})(module);


