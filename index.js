var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

var server_module = require("./Server/server");
var class_generator = require("./Models/Class/generate-class")
var api_generator = require("./Controllers/generate-api")
var db_generator = require('./Models/Database/generate-database');

var frontoffice_generate = require("./Controllers/generate-frontoffice");
var backoffice_generate = require("./Controllers/generate-backoffice");

var app = express();


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/gerarPastas", gerarPastas);
app.post("/gerarClasses", gerarClasses);
app.post("/gerarBd", gerarBd);
app.post("/gerarApi", gerarApi);
app.post("/gerarFrontOffice", gerarFrontOffice);
app.post("/gerarBackOffice",gerarBackOffice );


var schema_categoria = require("./Models/Schemas/categoria.js");
var schema_marca = require("./Models/Schemas/marca.js");
var schema_produto = require("./Models/Schemas/produto.js");

function gerarPastas(req, res) {
  server_module.gerarPastaPublish();
  res.sendStatus(200);
}

function gerarClasses(req, res) {
  class_generator.generate(schema_categoria);
  class_generator.generate(schema_marca);
  class_generator.generate(schema_produto);
  res.sendStatus(200);
}

function gerarBd(req, res) {
  server_module.gerarBd();
  res.sendStatus(200);
}

function gerarApi(req, res) {
  api_generator.generate({schema_categoria, schema_marca, schema_produto});
  res.sendStatus(200);
}

function gerarBackOffice(req, res) {  
  backoffice_generate.generate({schema_categoria, schema_marca, schema_produto});
  
  res.sendStatus(200);
}

function gerarFrontOffice(req, res) {  
  frontoffice_generate.generate({schema_produto});
  
  res.sendStatus(200);
}

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);
});
