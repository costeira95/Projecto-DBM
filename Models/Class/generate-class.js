var mustache = require('mustache');
var fs = require("fs");

function generate(class_schema, title, classes_properties, definitions, allOf, allOfIndex) {
    var template = fs.readFileSync("./Models/Class/class.mustache").toString();
    var props = generateClassProps(class_schema, classes_properties, definitions, allOf, allOfIndex);
    props = ((props.join()).split(','));
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

function generateClassProps(class_schema, classes_properties, definitions = false, allOf = false, allOfIndex) {
    var props = [];
    if(definitions === false && allOf === false) {
        props = Object.keys(class_schema.properties)
    } else if(definitions === true && allOf === false) {
        props = getProps(classes_properties, class_schema);
    } else if(definitions === true && allOf === true) {
        props = getProps(classes_properties, class_schema);
        props.push(Object.keys(class_schema.allOf[allOfIndex].properties)); 
    } else {
        props.push(Object.keys(class_schema.allOf[allOfIndex].properties));
    }
    return props;
}

/***********************************
 * Função para precurrer array
 * com propriadades
 */

 function getProps(array, class_schema) {
    var props = [];
    array.forEach(key => {
        props.push(Object.keys(class_schema.definitions[key].properties));
    });
    return props;
 }

module.exports.generate = generate;