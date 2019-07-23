(function(module) {
    // load key modules
    var express = require('express');
    var fs = require('fs');
    var path = require('path');
    var app = express();
    var router = express.Router();


    // Utility function for loading html views into the browser
    function renderPage(filename, res) {
        var readFile = __dirname + '/../views/' + filename + ".html";

        fs.readFile(readFile, 'utf8', function(err, data) {
            if(err) {
                res.writeHead(404);
                res.write(`Failed to render ${filename}`);
            }
            else {
                res.writeHead(200);
                res.write(data.toString());
            }
            res.end();
        });

    }

    function sendFileCallback(err) {
        if (err) {
            console.error(`error sending file at path: ${err}`);
        } else {
            console.log(`Sent: ${path}`);
        }
    }


    // /* GET home page. */
    router.get([ '/' , '/home' ], function(req, res) {
        var filepath = path.join(__dirname, '../views/index.html');

        // var filepath = '/index.html';

        // var options = {
        //     root: path.join(__dirname, 'public/')
        // };
        //
        // res.type('.html');
        // res.sendFile('index.html', options, sendFileCallback);

        res.type('.html');
        // res.sendFile(filepath);

        // res.render(filepath);

        res.writeHead(200);
        res.sendFile(filepath, res);



        // renderPage( 'index', res);
    });

    // router.get([ '/encounters' ], function(req, res) {
    //     var options = {
    //         root: path.join(__dirname, 'public/partials')
    //     };
    //
    //     res.type('.html');
    //     res.sendFile('encounters.html', options, sendFileCallback);
    // });
    //
    // router.get([ '/js/:path' ], function(req, res) {
    //     var options = {
    //         root: path.join(__dirname, 'public/js/')
    //     };
    //
    //     var path = req.params.path;
    //
    //     res.type('.js');
    //     res.sendFile(path, options, function (err) {
    //         if (err) {
    //             console.error(`error sending file at path: ${err}`);
    //         } else {
    //             console.log(`Sent: ${path}`);
    //         }
    //     });
    // });

    // router.get([ '/lib/:path' ], function(req, res) {
    //     var path = 'public/lib/' + req.params.path;
    //
    //     res.type('.js');
    //     res.sendFile(path, {}, function (err) {
    //         if (err) {
    //             console.error(`error sending file at path: ${err}`);
    //         } else {
    //             console.log(`Sent: ${path}`);
    //         }
    //     });
    // });

    /* front-end API calls */



    /* GET all other requests (catch all) */
    router.get('*', function(req, res) {

        console.warn('Possible issue, got to the catch-all route');

        res.sendFile('error', res);
    });


    module.exports = router;

})(module);


