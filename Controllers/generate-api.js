var mustache = require("mustache");
var fs = require("fs");

var template = fs.readFileSync("./Controllers/api.mustache").toString();
/**********************************
 * Função para gerar a api
 */
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
    fs.writeFileSync("./Publish/Controllers/api.js", output);
}
  
module.exports.generate = generate;