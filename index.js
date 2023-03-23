//configure express, hostname and port for the server
const express = require('express');
const app = express();
const port = 8000;
const hostname = '127.0.0.1';

//configure mongoose connection
const db = require('./config/mongoose');

const bodyParser = require('body-parser');
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// api path folder
app.use('/', require('./routes'));
//console.log(req.header('host'));

//start the server
var server = app.listen(port, hostname, function (err) {
    if (err) {
        console.log("error!")
    } else {
        var host = server.address().address;
        var port = server.address().port;
        console.log('express server running at http://' + host + ':' + port)
    }
});




