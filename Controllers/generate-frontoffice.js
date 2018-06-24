var mustache = require("mustache");
var fs = require("fs");

var template = fs.readFileSync("./Controllers/frontoffice.mustache").toString();
var config = JSON.parse(fs.readFileSync("./Server/config.json"));

function generate() {
    var view = {
      properties: config.frontoffice,
    }
    var output = mustache.render(template, view);
    console.log(output);
    fs.writeFileSync("./Publish/Controllers/frontoffice.js", output);
}
  
module.exports.generate = generate;