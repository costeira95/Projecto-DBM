var Marca = require('./Publish/Models/marca.js');
var Categoria = require('./Publish/Models/categoria.js');
var Produto = require('./Publish/Models/produto.js');


var m = new Marca("Marca 1");
m.save(log);

var c = new Categoria("Categoria 1");
c.save(log);

//Marca.all(log);
//Marca.delete(2, log);

var produto = new Produto("Produto 1", "desc produto 1", 20, 2, c, m);
produto.save(log);

Produto.get(1, log);

function log(value) {
    console.log(value);
}