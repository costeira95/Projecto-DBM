/************************
 * Importar os módulos
 * utilizados
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var server_module = require('./Server/server');
var class_generator = require('./Models/Class/generate-class');
/***************************
 * Definir o middleware
 */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("public"));

/****************************
 * Definir schemas para gerar
 * as classes
 */

var produto_schema = JSON.parse(fs.readFileSync("./Validate/Produto.json"));
var marca_schema = JSON.parse(fs.readFileSync("./Validate/Marca.json"));
var venda_schema = JSON.parse(fs.readFileSync("./Validate/Venda.json"));
var destaques_schema = JSON.parse(fs.readFileSync("./Validate/Destaques.json"));

/***************************
 * Funções REST
 */
app.post("/generate", generateFolders);
app.post("/generateClass", generateClasses);

/***************************
 * Funçoes para usar no REST
 */
function generateFolders (req, res) {
        server_module.generatePublish();
        res.send(200);
}

function generateClasses (req, res) {
    //class_generator.generate(marca_schema, "Marca");
    class_generator.generate(marca_schema, ["marca"]);
    res.send(200);
}

/****************************+
 * Iniciar o servidor
 */
var server = app.listen(5000, function() {
    var host = server.address().host;
    var port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
});