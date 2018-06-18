var Marca = require('./Publish/Models/marca.js');
var Categoria = require('./Publish/Models/categoria.js');
var Produto = require('./Publish/Models/produto.js');


var cat = Categoria.get(1, log);
var marca = Marca.get(1, log);

var m = new Marca("asdasdasd");
m.save(log);

var c = new Categoria("teste");
c.save(log);

//Marca.all(log);
//Marca.delete(2, log);

var produto = new Produto("teste", "teste", 20, 2, c, m);
produto.save(log);

Produto.get(1, log);

function log(value) {
    console.log(value);
}