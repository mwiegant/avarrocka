(function(module) {
    var express = require('express');
    var path = require('path');
    var router = express.Router();

    router.get([ '/favicon.ico' ], function(req, res, next){
        next();
    });


    /* For security purposes, error out any remaining GET requests */
    router.get('*', function(req, res) {
        var filepath = path.join(__dirname, '../public/error.html');

        res.status(404);
        res.sendFile(filepath, {}, function(err) {
            if (err) {
                console.error(`error retrieving file at path: ${filepath}`);
            }
        });
    });

    module.exports = router;

})(module);


