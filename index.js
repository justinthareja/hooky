var express = require('express');
var port = process.env.PORT || 1337;

var app = express();

app.get('/', function(req, res) {
  res.send('roooot');
});

app.get('/hi', function(req, res) {
  res.send('hi!');
});

app.get('/bye', function(req, res) {
  res.send('bye!');
})

app.listen(port);

console.log('listening on port...', port);
