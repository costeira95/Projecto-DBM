var Marca = require('./Publish/Models/marca.js');
var Categoria = require('./Publish/Models/categoria.js');
var Produto = require('./Publish/Models/produto.js');


//var cat = Categoria.get(1, log);
//var marca = Marca.get(1, log);

//var m = new Marca("asdasdasd");
//m.save(log);


//Marca.all(log);
Marca.delete(2, log);

function log(value) {
    console.log(value);
}