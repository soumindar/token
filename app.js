var express = require('express');
var app = express();
var token =require('./token')
app.use('/api/token', token)
module.exports = app;