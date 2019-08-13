(function (module) {
  const mongoClient = require('./mongoClient.js');
  var express = require('express');
  var path = require('path');
  var router = express.Router();

  router.get(['/favicon.ico'], function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    return;
  });

  router.get('/getAllAliveUnits', function(req, res) {
    mongoClient.getAllAliveUnits(function(units) {
      res.json(units);
    });
  });

  router.post('/updateUnit', function(req, res) {
    let response = {
      success: true
    };

    mongoClient.updateUnit(req.body, function(err) {
      if (err) {
        response.success = false;
        response.error = err;
      }

      res.json(response);
    });
  });

  router.post('/saveUnit', function(req, res) {
    let response = {
      success: true
    };

    mongoClient.saveUnit(req.body, function(err) {
      if (err) {
        response.success = false;
        response.error = err;
      }

      res.json(response);
    });
  });

  /* For security purposes, error out any remaining GET requests */
  router.get('*', function (req, res) {
    console.error("An error occurred while completing a GET request");

    res.status(500);
    res.send("An error occurred while completing a GET request");
    return;
  });

  module.exports = router;

})(module);


