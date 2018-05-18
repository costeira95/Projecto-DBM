var mustache = require('mustache');
var fs = require("fs");

function generate(class_schema, title) {
    var template = fs.readFileSync("./Models/Class/class.mustache").toString();
    var props = Object.keys(class_schema.properties);

    var config = {
        classTitle : title,
        classProperties : props.join(),
        classConstructor : function() {
            var constructor = "";
            props.forEach(key => {
                constructor += "this." + key + "=" + key +";\n\t";
            });
            return decodeHtmlEntity(constructor);
        }
    }
    var output = mustache.render(template, config);
    console.log(output);
    fs.writeFileSync("./Publish/Models/"+config.classTitle+".js", output);
}

function decodeHtmlEntity(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

module.exports.generate = generate;