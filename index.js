/************************
 * Importar os módulos
 * utilizados
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
app.use(express.static("public"));

/***************************
 * Funções REST
 */
app.post("/generate", function(req, res) {
    server_module.generatePublish();

    res.send(200);
});


/****************************+
 * Iniciar o servidor
 */
var server = app.listen(5000, function() {
    var host = server.address().host;
    var port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
});