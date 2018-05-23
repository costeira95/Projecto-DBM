var mustache = require('mustache');
var fs = require("fs");

function generate(class_schema, title, props) {
    var template = fs.readFileSync("./Models/Class/class.mustache").toString();
    var props = generateClassProps(class_schema, classes_properties)
    var config = {
        classTitle : title,
        classProperties : props.join(),
        classConstructor : function() {
            var constructor = "";
            props.forEach(key => {
                constructor += "this." + key + "=" + key +";\n\t";
            });
            return constructor;
        }
    }
    var output = mustache.render(template, config);
    console.log(output);
    fs.writeFileSync("./Publish/Models/"+config.classTitle+".js", output);
}

/*******************
 * Para gerar todas as classes que
 * forem passadas
 */

function generateClassProps(class_schema, classes_properties, definitions = false, allOf = false) {
        if(class_schema != null && classes_properties.length != 0) {
            var props = [];
            if(definitions === false && allOf === false) {
                props = Object.keys(class_schema.properties)
            } else if(definitions === true && allOf === false) {
                classes_properties.forEach(key => {
                    props.push(Object.keys(class_schema.definitions.key.properties));
                }); 
            }
            return props;
        }
}

module.exports.generate = generateClassProps;