var spawn   = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 1337;

var app = express();
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  res.status(500).send(err.message);
});

app.get('/', function(req, res) {
  res.send('greetings from hookrunner');
});

app.post('/hooky', function(req, res, next) {

  readConfig().then(function(config) {

    if (req.query.token !== config.token) { throw new Error ('Invalid Token'); }
    if (!req.query.hook) { throw new Error('No hook specified' ); }
    if (!config.hooks[req.query.hook]) { throw new Error('No config set up for hook: ' + req.query.hook); }
    
    var script = path.join(__dirname, '/scripts/', config.hooks[req.query.hook]);
    var command = spawn(script);
    var output = [];

    command.stdout.on('data', function(chunk) {
      output.push(chunk);
    });

    command.on('error', function(err) {
      throw err;
    });

    command.on('close', function(code) {
      if (code !== 0) {
        throw new Error('Error executing script');
      } else {
        res.send(Buffer.concat(output));
      }
    });

  })
  .catch(next);

});

app.get('*', function(req, res) {
  res.redirect('/');
});


app.listen(port);

console.log('listening on port...', port);

function readConfig() {
  return new Promise (function(resolve, reject) {
    fs.readFile(__dirname + '/config.json', 'utf-8', function(err, file) {
      if (err) return reject(err);
      resolve(JSON.parse(file));
    });
  });
}
