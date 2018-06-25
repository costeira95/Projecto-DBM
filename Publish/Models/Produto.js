var database = require('../../sqlite.js')('./Publish/Database/projeto_dbm.db');
/************************************************
*   Criação da class produto,
*    propriedades: nome,descricao,preco,stock,categoria,marca
*/
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

/************************************************
*   Obter todos os dados da base de dados
*/
produto.all = function (callback) {
    //fazer a chamada à função all do database
    database.all("SELECT produtos.*, marcas.nome as marca,categorias.nome as categoria FROM produtos INNER JOIN marcas on marcas.marca_id = produtos.marca_id INNER JOIN categorias on categorias.categoria_id = produtos.categoria_id ", this, callback);
}

/************************************************
*   Obter dados de um determinado dado
*   da base de dados
*/
produto.get = function (id, callback) {
     database.get("SELECT produtos.*, marcas.nome as marca,categorias.nome as categoria FROM produtos INNER JOIN marcas on marcas.marca_id = produtos.marca_id INNER JOIN categorias on categorias.categoria_id = produtos.categoria_id  WHERE produto_id = " + id, [], this, callback);
}

/************************************************
*   Gravar dados na base de dados
*/
produto.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id será para update
        //fazer a chamada à função run do database para atualizar o registo
        database.run("UPDATE produtos SET nome = ?,descricao = ?,preco = ?,stock = ?,categoria = ?,marca = ? WHERE produto_id = " + this.id + "", [this.nome,this.descricao,this.preco,this.stock,this.categoria.id,this.marca.id], callback);
    } else { //caso contrário para insert
        //fazer a chamada à função run do database para inserir o registo
        database.run("INSERT INTO produtos(nome,descricao,preco,stock,categoria_id,marca_id) VALUES(?,?,?,?,?,?)", [this.nome,this.descricao,this.preco,this.stock,this.categoria.id,this.marca.id], callback);
    }
}

/************************************************
*   Eliminar um dado na base de dados
*/
produto.delete = function (id, callback) {
//fazer a chamada à função run do database para apagar o registo
database.run("DELETE FROM produtos WHERE produto_id = " + id, [], callback);
}

/************************************************
*   Ordena os  e limita
*/
produto.top = function (property,order,limit,callback) {
    var dbprop = Object.keys(produto.mappingDBtoObject).find(key => produto.mappingDBtoObject[key] ==
    property);
    database.where(`SELECT * FROM produtos ORDER BY ${dbprop} ${order} LIMIT ?`, [limit], produto,
    callback);
}

/************************************************
*   Mapea os dados para objectos
*/
produto.mappingDBtoObject = {
    nome:'nome',descricao:'descricao',preco:'preco',stock:'stock',categoria:'categoria',marca:'marca',produto_id:'id'
}

module.exports = produto;