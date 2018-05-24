var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

var server_module = require("./Server/server");
var class_generator = require("./Models/Class/generate-class")
var db_generator = require('./Models/Database/generate-database');


var app = express();


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/generateFolders", generateFolders);
app.post("/generateClasses", generateClasses);
app.post("/generateDatabase", generateDatabase);


var schema_categoria = JSON.parse(fs.readFileSync("./Models/Schemas/categoria.json"));
var schema_marca = JSON.parse(fs.readFileSync("./Models/Schemas/marca.json"));
var schema_produto = JSON.parse(fs.readFileSync("./Models/Schemas/produto.json"));

function generateFolders(req, res) {
  server_module.generatePublish();
  res.sendStatus(200);
}

function generateClasses(req, res) {
  class_generator.generate(schema_categoria);
  class_generator.generate(schema_marca);
  class_generator.generate(schema_produto);
  res.sendStatus(200);
}

function generateDatabase(req, res) {
  server_module.generateDatabase();
  res.sendStatus(200);
}

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);
});
