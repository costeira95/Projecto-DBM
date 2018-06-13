var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var api_routes = require('./Controllers/api.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api_routes);

var server = app.listen(8080,function () {
    console.log('Example app listening on port 8080')
});