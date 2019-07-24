(function(module) {
    // load key modules
    var express = require('express');
    var path = require('path');
    var router = express.Router();

    function sendFileCallback(err) {
        if (err) {
            console.error(`error sending file at path: ${err}`);
        }
    }


    // /* GET home page. */
    router.get([ '/' , '/home' ], function(req, res) {
        var filepath = path.join(__dirname, '../public/index.html');

        res.sendFile(filepath, {}, sendFileCallback);
    });

    router.get([ '/encounters' ], function(req, res) {
        var filepath = path.join(__dirname, '../public/partials/encounters.html');

        res.sendFile(filepath, {}, sendFileCallback);
    });

    router.get([ '/favicon.ico' ], function(req, res, next){
        next();
    });

    /* For security purposes, error out any remaining GET requests */
    router.get('*', function(req, res) {
        var filepath = path.join(__dirname, '../public/error.html');

        res.status(404);
        res.sendFile(filepath, {}, sendFileCallback);
    });

    module.exports = router;

})(module);


