var database = require('../../sqlite.js')('./Publish/Database/projeto_dbm.db');

function categoria (nome) {
    this.id = 0;
        this.nome = nome;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

categoria.all = function (callback) {
    //fazer a chamada à função all do database
    database.all("SELECT categorias.* FROM categorias ", this, callback);
}

categoria.get = function (id, callback) {
     database.get("SELECT categorias.* FROM categorias  WHERE categoria_id = " + id, [], this, callback);
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

categoria.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(categoria.mappingDBtoObject).find(key => categoria.mappingDBtoObject[key] ==
    property);
    database.where(`SELECT * FROM categorias ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], categoria,
    callback);
}


categoria.mappingDBtoObject = {
    nome:'nome',categoria_id:'id'
}

module.exports = categoria;