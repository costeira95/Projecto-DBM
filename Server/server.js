var fs = require("fs");
var mkdirp = require("mkdirp");
var del = require("del");
var childProcess = require("child_process");
var mustache = require("mustache");
var db_generator = require("../Models/Database/generate-database");

var config = JSON.parse(fs.readFileSync("./Server/config.json"));

function generatePublish() {
  del(["./Publish"]).then(paths => createFolders(startIndex));
}

function createFolders(callback) {
  
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

function startIndex() {
  
  var template = fs.readFileSync("./Server/server.mustache").toString();

  var output = mustache.render(template, config);

  fs.writeFile("./Publish/index.js", output, err => {
    if (err) throw err;
    start();
  });
}

function start() {
  childProcess.fork("./Publish/index.js", [], { execArgv: ["--debug=2000"] });
}

function generateDatabase(){
  var schemas = [];

  config.models.forEach(model => {
      schemas.push(JSON.parse(fs.readFileSync(model.path)));
  })

  db_generator.generate(config.dbname, schemas);
}

module.exports.generatePublish = generatePublish; 
module.exports.generateDatabase = generateDatabase; 