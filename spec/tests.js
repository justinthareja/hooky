var assert = require('chai').assert;
var request = require('supertest');

describe('/hooky', function () {

  var server;

  beforeEach(function () {
    delete require.cache[require.resolve('../app')];
    server = require('../app');
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('Throws a 404 if no hook is specified', function(done) {
    request(server)
      .post('/hooky')
      .expect(404, done);
  });

  it('Throws a 500 if an invalid hook is specified', function(done) {
    request(server)
      .post('/hooky/undefined_hook_in_config')
      .expect(500, done);
  });

  it('Throws a 500 if no token query parameter is specified', function(done) {
    request(server)
      .post('/hooky/hello')
      .expect(500, done);
  });

  it('Executes a script if your url is correct (check hello.txt)', function(done) {
    request(server)
      .post('/hooky/hello?token=QWERTY90001')
      .expect(200, done);
  });

  it('only accepts a POST request', function(done) {
    request(server)
      .get('/hooky/hello?token=QWERTY90001')
      .expect(404, done);
  });

  it('Throws an error if a script at the hook path does not exist', function(done) {
    request(server)
      .post('/hooky/noscript?token=QWERTY90001')
      .expect(500, done);
  });


});