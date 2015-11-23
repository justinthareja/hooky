var express = require('express');
var port = process.env.PORT || 1337;

var app = express();

app.get('/', function(req, res) { res.send('roooot'); });
app.get('/test', function(req, res) { res.send('test'); });

app.listen(port);

console.log('listening on port...', port);
