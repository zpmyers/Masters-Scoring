var express = require('express');

var app = express();

port = 8080;

app.listen(port, function (err) {
    console.log('running server on port '  + port)
});