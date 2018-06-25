var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './Publish/Views');



//categorias

    var categoria = require('./../Models/categoria.js');
    var categoriaschema = require('./../../Models/Schemas/categoria.js');

    //get inserir categorias

    app.get('/categoria/inserir', function(req, res) {
        res.render('form', {
            properties : Object.keys(new categoria()).map(key => {
                    return {
                        name: key
                    };
                })
        });
    });

    //get detalhes categorias

    app.get('/categoria/detalhe/:id', function (req, res) {
	categoria.get(req.params.id, function (row) {
		res.render('details', {
		properties: function () {
			var allProps = Object.getOwnPropertyNames(row);
			var validProps = [];
			allProps.forEach(function (prop) {
				if (categoriaschema.properties.hasOwnProperty(prop)) {
					validProps.push({
                        name: prop,
                        value: row[prop]
					});
				}
			});
				return validProps;
		},
			references: function () {
				var allRefs = [];
				if (categoriaschema.references) {
				categoriaschema.references.forEach(function (ref) {
					allRefs.push({
						label: ref.label,
						model: ref.model,
						values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
						row[(ref.model + "_id").toLowerCase()]
					});
				});
			}
				return allRefs;
			},
			get hasReferences() {
				return this.references().length > 0;
			}
		})
	});
});

    app.get('/categoria/editar/:id', function(req, res) {
        categoria.get(req.params.id, function(row) {
            res.render('form', {
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
        });
    });

    app.get('/categoria', function (req, res) {
        categoria.all(function (rows) {
            res.render('list', {
                title: 'categoria',
                rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions: [{
                            label: '',
                            link: './categoria/Detalhe/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './categoria/Editar/' + obj.id,
                            image: {
                                src: '../images/edit.png'
                            },
                            tooltip: 'Editar'
                        }, {
                            label: '',
                            link: '#',
                            image: {
                                src: '../images/delete.png'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]

                        }]
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

//marcas

    var marca = require('./../Models/marca.js');
    var marcaschema = require('./../../Models/Schemas/marca.js');

    //get inserir marcas

    app.get('/marca/inserir', function(req, res) {
        res.render('form', {
            properties : Object.keys(new marca()).map(key => {
                    return {
                        name: key
                    };
                })
        });
    });

    //get detalhes marcas

    app.get('/marca/detalhe/:id', function (req, res) {
	marca.get(req.params.id, function (row) {
		res.render('details', {
		properties: function () {
			var allProps = Object.getOwnPropertyNames(row);
			var validProps = [];
			allProps.forEach(function (prop) {
				if (marcaschema.properties.hasOwnProperty(prop)) {
					validProps.push({
                        name: prop,
                        value: row[prop]
					});
				}
			});
				return validProps;
		},
			references: function () {
				var allRefs = [];
				if (marcaschema.references) {
				marcaschema.references.forEach(function (ref) {
					allRefs.push({
						label: ref.label,
						model: ref.model,
						values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
						row[(ref.model + "_id").toLowerCase()]
					});
				});
			}
				return allRefs;
			},
			get hasReferences() {
				return this.references().length > 0;
			}
		})
	});
});

    app.get('/marca/editar/:id', function(req, res) {
        marca.get(req.params.id, function(row) {
            res.render('form', {
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
        });
    });

    app.get('/marca', function (req, res) {
        marca.all(function (rows) {
            res.render('list', {
                title: 'marca',
                rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions: [{
                            label: '',
                            link: './marca/Detalhe/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './marca/Editar/' + obj.id,
                            image: {
                                src: '../images/edit.png'
                            },
                            tooltip: 'Editar'
                        }, {
                            label: '',
                            link: '#',
                            image: {
                                src: '../images/delete.png'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]

                        }]
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

//produtos

    var produto = require('./../Models/produto.js');
    var produtoschema = require('./../../Models/Schemas/produto.js');

    //get inserir produtos

    app.get('/produto/inserir', function(req, res) {
        res.render('form', {
            properties : Object.keys(new produto()).map(key => {
                    return {
                        name: key
                    };
                })
        });
    });

    //get detalhes produtos

    app.get('/produto/detalhe/:id', function (req, res) {
	produto.get(req.params.id, function (row) {
		res.render('details', {
		properties: function () {
			var allProps = Object.getOwnPropertyNames(row);
			var validProps = [];
			allProps.forEach(function (prop) {
				if (produtoschema.properties.hasOwnProperty(prop)) {
					validProps.push({
                        name: prop,
                        value: row[prop]
					});
				}
			});
				return validProps;
		},
			references: function () {
				var allRefs = [];
				if (produtoschema.references) {
				produtoschema.references.forEach(function (ref) {
					allRefs.push({
						label: ref.label,
						model: ref.model,
						values: ref.relation == "M-M" ? req.params.id + '/' + ref.model :
						row[(ref.model + "_id").toLowerCase()]
					});
				});
			}
				return allRefs;
			},
			get hasReferences() {
				return this.references().length > 0;
			}
		})
	});
});

    app.get('/produto/editar/:id', function(req, res) {
        produto.get(req.params.id, function(row) {
            res.render('form', {
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
        });
    });

    app.get('/produto', function (req, res) {
        produto.all(function (rows) {
            res.render('list', {
                title: 'produto',
                rows: rows.map(obj => {
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions: [{
                            label: '',
                            link: './produto/Detalhe/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './produto/Editar/' + obj.id,
                            image: {
                                src: '../images/edit.png'
                            },
                            tooltip: 'Editar'
                        }, {
                            label: '',
                            link: '#',
                            image: {
                                src: '../images/delete.png'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]

                        }]
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
