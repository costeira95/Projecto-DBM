var mustache = require("mustache");
var fs = require("fs");

var config = JSON.parse(fs.readFileSync("./Server/config.json"));
var template = fs.readFileSync("./Models/Class/class.mustache").toString();

function generate(schema){
  var view = {
    dbname: "projeto_dbm.db",
    title: schema.title,
    table: schema.title + "s",
    primaryKey: {
        name: "id",
        columnName: schema.title + "_id"
    },
    properties: function () { //função para converter as propriedades que são objectos para um array de objetos (mais fácil para processar)
        return Object.keys(schema.properties).map(key => { //converte as propriedades que são objectos para um array de objetos (mais fácil para processar)
            schema.properties[key].name = key; //acrescento a propriedade name que terá o nome da propriedade
            schema.properties[key].required = schema.required.indexOf(key) !== -1; //acrescento a propriedade required que terá true ou false caso esteja no array required do schema
            schema.properties[key].columnName = key; //será o nome utilizado para a coluna que terá na tabela da base de dados
            schema.properties[key].foreignKey = false;

            if (schema.references != undefined){
                if (schema.references.find(function (obj) {return obj.model == key;})){
                    schema.properties[key].foreignKey = true;
                }
            }

            return schema.properties[key];
        });
    },
    references: function () {
        var allRefs = "";
        if (schema.references) {
        schema.references.forEach(function (ref) {
            allRefs += "INNER JOIN " + ref.model + "s on " + ref.model + "s." + ref.model + "_id = " + schema.title + "s." + ref.model + "_id "
        });
    }
        return allRefs;
    },
    outros: function () {
        var allRefs = "";
        if (schema.references) {
            allRefs+=", ";
        schema.references.forEach(function (ref) {
            allRefs += ref.model + "s.nome as " + ref.model + ",";
        });
        allRefs = allRefs.substring(0, allRefs.length - 1);
    }
        return allRefs;
    },
    get propertiesJoin() { //criar um array com os nomes das propriedades e fazer o join para separar por ,
        return this.properties().map(obj => {
            return obj.name
        }).join()
    },
    get columnNames() { //criar um array com os nomes das colunas e fazer o join para separar por ,
        return this.properties().map(obj => {
            if (obj.foreignKey)
                return obj.name + "_id";
            return obj.name
        }).join()
    },
    get columnNamesSetValues() { //criar um array com os nomes das colunas para iguala-los ao novo valor para essa coluna ,
        return this.properties().map(obj => {
            var txt = obj.name;
            if (obj.foreignKey)
                txt += "_id";

            return txt + '=?';
        }).join()
    },
    get propertiesJoinThis() { //criar um array com os nomes das propriedades (com o this.) e fazer o join para separar por ,
        return this.properties().map(obj => {
            if (obj.foreignKey)
                return 'this.' + obj.name + ".id";
            return 'this.' + obj.name
        }).join()
    },
    get propertiesSetValues() { //criar um array com os nomes das propriedades (igualando a um parâmetro) e fazer o join para separar por ,
        return this.properties().map(obj => {
            return obj.name + ' = ?'
        }).join()
    },
    get propertiesValuesParams() { //criar um array com os parâmetros igual ao número de propriedades e fazer o join para separar por ,
        return this.properties().map(obj => {
            return '?'
        }).join()
    },
    get mappingDBtoObject() { //criar um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
        var props = this.properties();
        props.push(this.primaryKey);
        return props.map(obj => {
            return obj.columnName.toLowerCase() + ":'" + obj.name + "'";
        }).join()
    }
}

  var output = mustache.render(template, view);
  console.log(output);
  fs.writeFileSync("./Publish/Models/" + view.title + ".js", output);
}

module.exports.generate = generate;