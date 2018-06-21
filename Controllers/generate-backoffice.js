var mustache = require("mustache");
var fs = require("fs");

var template = fs.readFileSync("./Controllers/backoffice.mustache").toString();

function generate(schemas){
    var view = {
      properties: function () {
          return Object.keys(schemas).map(key => {
              return schemas[key];
          }); 
      }
    }
    var output = mustache.render(template, view);
    console.log(output);
    fs.writeFileSync("./Publish/Controllers/backoffice.js", output);
}
  
module.exports.generate = generate;