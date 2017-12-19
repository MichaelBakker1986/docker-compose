const should = require('should');
require('express-test');
const app = require('../lme-value-app').app

// test the body
app.request().get('/hello').end()
    .verify(function(res) {
        res.body.should.equal('hello');
    });
