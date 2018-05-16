/************************
 * Importar os módulos
 * utilizados
 * 
 */

var fs = require("fs");
var mkdirp = require("mkdirp");
var del = require("del");
var childProcess = require("child_process");
var mustache = require("mustache");

/***********************************
 * 
 * Server para gerar as pastas
 * automaticamente no modelo MVC
 * 
 */
function generatePublish() {
    del(["./Publish"]).then(paths => {
        mkdirp("./Publish/Controllers", function() {
            startServer();
        });
        mkdirp("./Publish/Models");
        mkdirp("./Publish/Views");
        mkdirp("./Publish/Public", function (error) {
            if (!error) {
                mkdirp("./Publish/Public/css");
                mkdirp("./Publish/Public/images");
                mkdirp("./Publish/Public/js");
            }
        });
    });
}

/*************************************
 * Iniciar o servidor automaticamente
 */

function startServer() {
    var config = JSON.parse(fs.readFileSync("./Server/config.json"));
    var template = fs.readFileSync("./Server/server.mustache").toString();

    var output = mustache.render(template, config);

    fs.writeFile("./Publish/index.js", output, err => {
        if (err) throw err;
        childProcess.fork("./Publish/index.js", [], { execArgv: ["--debug=8080"] });
    });
}

/********
 * exportar as funçoes
 */
module.exports.generatePublish = generatePublish;