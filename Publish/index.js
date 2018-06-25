/***********************************
 * Importação dos modulos do node
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mustacheExpress = require('mustache-express');

/************************************************************
 * Iniciação do modulo express e configuração do middleware
 */
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './Publish/Views');

/*************************************************
 * Importação de rotas
 */
var api_routes = require('./Controllers/api.js');
var frontoffice_routes = require('./Controllers/frontoffice.js');
var backoffice_routes = require('./Controllers/backoffice.js');

/**************************************************************
 * Definição das rotas a serem utilizadas
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Public'));
app.use('/api', api_routes);
app.use('/', frontoffice_routes);
app.use('/backoffice', backoffice_routes);

/******************************************
 * criação do servidor
 */
var server = app.listen(8080,function () {
    console.log('Example app listening on port 8080')
});