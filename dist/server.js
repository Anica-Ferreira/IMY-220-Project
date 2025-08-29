"use strict";

/* Anica Ferreira u24581802 */
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;
app.use(express["static"](path.join(__dirname, '../frontend/public')));

//Api endpoints:
app.post('/auth/signin', function (req, res) {
  res.json({
    email: "example@gmail.com"
  });
});
app.get('/api', function (req, res) {
  res.json({
    message: 'Hello from the backend!'
  });
});

//Wildcard api endpoint
app.get('/{*any}', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'));
});
app.listen(port, function () {
  console.log("Server is listening on http://localhost:".concat(port));
});