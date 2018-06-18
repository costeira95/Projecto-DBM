var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './StaticFiles');

var api_routes = require('./Controllers/api.js');
var frontoffice_routes = require('./Controllers/frontoffice.js');
var backoffice_routes = require('./Controllers/backoffice.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api_routes);
app.use('/', frontoffice_routes);
app.use('/backoffice', backoffice_routes);

var server = app.listen(8080,function () {
    console.log('Example app listening on port 8080')
});