var mustache = require("mustache");
var fs = require("fs");

var template = fs.readFileSync("./Controllers/backoffice.mustache").toString();

function generate(view){
    var output = mustache.render(template, view);
    console.log(output);
    fs.writeFileSync("./Publish/Controllers/backoffice.js", output);
}
  
module.exports.generate = generate;