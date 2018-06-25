var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var fs = require("fs");

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './Publish/Views');
var config = JSON.parse(fs.readFileSync("./Server/config.json"));



var produto = require('./../Models/produto.js');
app.get('/produtos', function (req, res) {
	produto.top("nome", "DESC", 3, function (rows) {
	console.log(rows)
		res.render('frontoffice', {
		models: config.models,
		Titulo: "Lista de produtos",
		rows: rows.map(obj => {
			return {
			properties: Object.keys(obj).map(key => {
				return {
						name: key,
						value: obj[key]
					}
				})
			}
		}),
			columns: Object.keys(new produto()).map(key => {
				return {
					name: key
				};
			})
		});
	});
});

var marca = require('./../Models/marca.js');
app.get('/marcas', function (req, res) {
	marca.top("nome", "DESC", 3, function (rows) {
	console.log(rows)
		res.render('frontoffice', {
		models: config.models,
		Titulo: "Lista de marcas",
		rows: rows.map(obj => {
			return {
			properties: Object.keys(obj).map(key => {
				return {
						name: key,
						value: obj[key]
					}
				})
			}
		}),
			columns: Object.keys(new marca()).map(key => {
				return {
					name: key
				};
			})
		});
	});
});

var categoria = require('./../Models/categoria.js');
app.get('/categorias', function (req, res) {
	categoria.top("nome", "DESC", 3, function (rows) {
	console.log(rows)
		res.render('frontoffice', {
		models: config.models,
		Titulo: "Lista de categorias",
		rows: rows.map(obj => {
			return {
			properties: Object.keys(obj).map(key => {
				return {
						name: key,
						value: obj[key]
					}
				})
			}
		}),
			columns: Object.keys(new categoria()).map(key => {
				return {
					name: key
				};
			})
		});
	});
});

app.get('/', function (req, res) {
	produto.top("nome", "DESC", 3, function (rows) {
	console.log(rows)
		res.render('frontoffice', {
		models: config.models,
		Titulo: "Bem Vindo ao FrontOffice.",
		SubTitulo: "Veja os nossos produtos e utilize o menu para ver o resto.",
		rows: rows.map(obj => {
			return {
			properties: Object.keys(obj).map(key => {
				return {
						name: key,
						value: obj[key]
					}
				})
			}
		}),
			columns: Object.keys(new produto()).map(key => {
				return {
					name: key
				};
			})
		});
	});
});

module.exports = app;