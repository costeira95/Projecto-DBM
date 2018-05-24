var Marca = require('./Publish/Models/marca.js');
var Categoria = require('./Publish/Models/categoria.js');
var Produto = require('./Publish/Models/produto.js');


var cat = Categoria.get(1, log);
var marca = Marca.get(1, log);

//var p = new Produto("Prod1", "Desc1", 20, 100, cat, marca);
//p.save(log);

function log(value) {
    console.log(value);
}