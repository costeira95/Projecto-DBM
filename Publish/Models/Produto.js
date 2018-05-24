var database = require('../../sqlite.js')('./Publish/Database/projeto_dbm.db');

function produto (nome,descricao,preco,stock,categoria,marca) {
    this.id = 0;
        this.nome = nome;
                 
        this.descricao = descricao;
                 
        this.preco = preco;
                 
        this.stock = stock;
                 
        this.categoria = categoria;
        Object.defineProperty(this,'categoria',{ enumerable:false});         
        this.marca = marca;
        Object.defineProperty(this,'marca',{ enumerable:false});         
        Object.defineProperty(this,'id',{ enumerable:false});
}

produto.all = function (callback) {
    //fazer a chamada à função all do database
    database.all("SELECT * FROM produtos", this, callback);
}

produto.get = function (id, callback) {
     database.get("SELECT * FROM produtos WHERE produto_id = " + id, [], this, callback);
}

produto.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para update
        //fazer a chamada à função run do database para atualizar o registo
        database.run("UPDATE produtos SET nome = ?,descricao = ?,preco = ?,stock = ?,categoria = ?,marca = ? WHERE produto_id = " + this.id + "", [this.nome,this.descricao,this.preco,this.stock,this.categoria.id,this.marca.id], callback);
    } else { //caso contrário para insert
        //fazer a chamada à função run do database para inserir o registo
        database.run("INSERT INTO produtos(nome,descricao,preco,stock,categoria_id,marca_id) VALUES(?,?,?,?,?,?)", [this.nome,this.descricao,this.preco,this.stock,this.categoria.id,this.marca.id], callback);
    }
}

produto.mappingDBtoObject = {
    nome:'nome',descricao:'descricao',preco:'preco',stock:'stock',categoria:'categoria',marca:'marca',produto_id:'id'
}

module.exports = produto;