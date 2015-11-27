var spawn  = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.json());
app.use(handleError);

app.post('/hooky/:hook', function(req, res, next) {

  readConfig().then(function(config) {
    if (!config.hooks[req.params.hook]) { throw new Error('No config set up for hook: ' + req.params.hook); }
    if (req.query.token !== config.token) { throw new Error ('Invalid Token'); }

    return path.join(__dirname, '/scripts/', config.hooks[req.params.hook]);
  })
  .then(verifyPathExists)
  .then(function(script) {

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

module.exports = app.listen(port);

console.log('listening on port...', port);

function readConfig() {
  return new Promise (function(resolve, reject) {
    fs.readFile(__dirname + '/config.json', 'utf-8', function(err, file) {
      if (err) return reject(err);
      resolve(JSON.parse(file));
    });
  });
}

function verifyPathExists(path) {
  return new Promise (function(resolve, reject) {
    fs.exists(path, function(exists) {
      if (!exists) { reject(new Error('No script found at: ' + path)); }
      resolve(path);
    });
  });
}

function handleError(err, req, res, next) {
  res.status(500).send(err.message);
}

