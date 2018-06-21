var database = require('../../sqlite.js')('./Publish/Database/projeto_dbm.db');

function categoria (nome) {
    this.id = 0;
        this.nome = nome;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

categoria.all = function (callback) {
    //fazer a chamada à função all do database
    database.all("SELECT * FROM categorias", this, callback);
}

categoria.get = function (id, callback) {
     database.get("SELECT * FROM categorias WHERE categoria_id = " + id, [], this, callback);
}

categoria.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para update
        //fazer a chamada à função run do database para atualizar o registo
        database.run("UPDATE categorias SET nome = ? WHERE categoria_id = " + this.id + "", [this.nome], callback);
    } else { //caso contrário para insert
        //fazer a chamada à função run do database para inserir o registo
        database.run("INSERT INTO categorias(nome) VALUES(?)", [this.nome], callback);
    }
}

categoria.delete = function (id, callback) {
//fazer a chamada à função run do database para apagar o registo
database.run("DELETE FROM categorias WHERE categoria_id = " + id, [], callback);
}

categoria.many = function (model, id, callback) {
    database.where(`SELECT categoria.* FROM categoria INNER JOIN ${model}s ON ${model}s.${model.toLowerCase()}_id = categoria.${model.toLowerCase()}_id WHERE categoria.${model.toLowerCase()}_id=` +id, [], this,  callback);
}

categoria.mappingDBtoObject = {
    nome:'nome',categoria_id:'id'
}

module.exports = categoria;