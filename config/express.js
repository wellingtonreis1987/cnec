// carrega o modulo do express
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var consign = require('consign');

app.set('secret', 'wgar');

// middleware
app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('models')
    .then('api')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

// exportando configurações para uso global
module.exports = app;