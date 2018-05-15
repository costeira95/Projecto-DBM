/************************
 * Importar os módulos
 * utilizados
 * 
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server_module = require('./Server/server');
/***************************
 * Definir o middleware
 */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("Public"));

/***************************
 * Funções REST
 */
app.post("/generate", function(req, res) {
    server_module.generatePublish();
});


/****************************+
 * Iniciar o servidor
 */
var server = app.listen(8080, function() {
    var host = server.address().host;
    var port = server.address().port;
})