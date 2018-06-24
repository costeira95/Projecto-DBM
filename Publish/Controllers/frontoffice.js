var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var fs = require("fs");

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './StaticFiles');
var config = JSON.parse(fs.readFileSync("./Server/config.json"));

var produto = require('./../Models/produto.js');

app.get('/', function (req, res) {
	produto.top("nome", "DESC", 3, function (rows) {
	console.log(rows)
		res.render('frontoffice', {
		models: config.models,
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
