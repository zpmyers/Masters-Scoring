var express = require('express');
var http = require('http');
var https = require('https');

var app = express();

app.port = 8080;

app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function(req, res) {
	    res.sendFile(__dirname + '/index.html');
});

/*app.listen(app.port, function (err) {
	    console.log('running server on port '  + app.port);
});*/

http.createServer(app).listen(80); 
https.createServer(app).listen(443);
