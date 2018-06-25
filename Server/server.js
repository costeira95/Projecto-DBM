/*************************************
 * Importação dos modulos do node
 */
var fs = require("fs");
var mkdirp = require("mkdirp");
var del = require("del");
var childProcess = require("child_process");
var mustache = require("mustache");
var db_generator = require("../Models/Database/generate-database");

/*******************************************
 * Importação da configuração do servidor
 */
var config = JSON.parse(fs.readFileSync("./Server/config.json"));

/***********************************
 * Função para Publicar as pastas
 */
function gerarPastaPublish() {
  del(["./Publish"]).then(paths => criarPastas(startIndex));
}

/*************************************
 * Função para criar as pastas
 */
function criarPastas(callback) {
  
  mkdirp("./Publish/Controllers", function(err) {
      callback();
  });

  mkdirp("./Publish/Models", function(err) {});

  mkdirp("./Publish/Public", function(err) {
    if (!err) {
      mkdirp("./Publish/Public/css", function(err) {});

      mkdirp("./Publish/Public/images", function(err) {});

      mkdirp("./Publish/Public/js", function(err) {});
    }
  });

  mkdirp("./Publish/Views", function(err) {});

  mkdirp("./Publish/Database", function(err) {});
}

/*********************************
 * Função para criar o servidor
 */
function startIndex() {
  
  var template = fs.readFileSync("./Server/server.mustache").toString();

  var output = mustache.render(template, config);

  fs.writeFile("./Publish/index.js", output, err => {
    if (err) throw err;
    start();
  });
}

/************************************
 * Função para iniciar o servidor
 */
function start() {
  childProcess.fork("./Publish/index.js", [], { execArgv: ["--debug=8080"] });
}

/**************************************
 * Função para gerar a base de dados
 */
function gerarBd(){
  var schemas = [];

  config.models.forEach(model => {
    if(model.path != null)
      schemas.push(require(model.path));
  })

  db_generator.generate(config.dbname, schemas);
}

/*****************************************************
 * Exportação das funções
 */
module.exports.gerarPastaPublish = gerarPastaPublish; 
module.exports.gerarBd = gerarBd; 