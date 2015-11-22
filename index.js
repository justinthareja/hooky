var express = require('express');
var port = process.env.PORT || 1337;

var app = express();

app.get('/', function(req, res) {
  res.send('Hello from index');
});

app.listen(port);

console.log('listening on port...', port);
