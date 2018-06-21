var database = require('../../sqlite.js')('./Publish/Database/projeto_dbm.db');

function marca (nome) {
    this.id = 0;
        this.nome = nome;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

marca.all = function (callback) {
    //fazer a chamada à função all do database
    database.all("SELECT * FROM marcas", this, callback);
}

marca.get = function (id, callback) {
     database.get("SELECT * FROM marcas WHERE marca_id = " + id, [], this, callback);
}

marca.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para update
        //fazer a chamada à função run do database para atualizar o registo
        database.run("UPDATE marcas SET nome = ? WHERE marca_id = " + this.id + "", [this.nome], callback);
    } else { //caso contrário para insert
        //fazer a chamada à função run do database para inserir o registo
        database.run("INSERT INTO marcas(nome) VALUES(?)", [this.nome], callback);
    }
}

marca.delete = function (id, callback) {
//fazer a chamada à função run do database para apagar o registo
database.run("DELETE FROM marcas WHERE marca_id = " + id, [], callback);
}

marca.many = function (model, id, callback) {
    database.where(`SELECT marca.* FROM marca INNER JOIN ${model}s ON ${model}s.${model.toLowerCase()}_id = marca.${model.toLowerCase()}_id WHERE marca.${model.toLowerCase()}_id=` +id, [], this,  callback);
}

marca.mappingDBtoObject = {
    nome:'nome',marca_id:'id'
}

module.exports = marca;