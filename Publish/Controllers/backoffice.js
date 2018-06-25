var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var fs = require("fs");

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './Publish/Views');
var config = JSON.parse(fs.readFileSync("./Server/config.json"));


//raiz do backoffice
app.get('/', function (req, res) {
        produto.all(function (rows) {
            res.render('list', {
                title: 'produto',
                Titulo: "Bem Vindo ao BackOffice.",
		        SubTitulo: "Faça, por exemplo, a gestão de produtos ou utilize o menu para navegar pelo que pretender.",
                models: config.models,
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
                            link: './produtos/Detalhes/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './produtos/Editar/' + obj.id,
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


//categorias

    var categoria = require('./../Models/categoria.js');
    var categoriaschema = require('./../../Models/Schemas/categoria.js');
    var props = categoriaschema.properties;

    //get inserir categorias

    app.get('/categorias/inserir', function(req, res) {
        res.render('inserir', {
            title: 'categoria',
            models: config.models,
            retroceder : "../",
            Titulo: "Inserir categoria",
            properties : Object.keys(new categoria()).map(key => {
                var req = (produtoschema.required.includes(key) ? "required" : "");
                var req = (produtoschema.required.includes(key) ? "required" : "");
                var collumn = props[key];
                var min = ((collumn.minimum != void 0 ) ? "min='"+collumn.minimum+"'": "");
                var max = ((collumn.maximum != void 0 ) ? "max='"+collumn.maximum+"'" : "");
                    return {
                        name: key,
                        required: req,
                        minLenght: min,
                        maxLenght: max
                    };
                }),
            references: function () {
				var allRefs = [];
				if (categoriaschema.references) {
				categoriaschema.references.forEach(function (ref) {
					allRefs.push({
						label: ref.label,
						model: ref.model
					});
				});
			}
				return allRefs;
			},
        });
    });

    //get detalhes categorias

    app.get('/categorias/detalhes/:id', function (req, res) {
	categoria.get(req.params.id, function (row) {
		res.render('details', {
        title: 'categoria',
        models: config.models,
        retroceder : "../../",
        Titulo: "Detalhes de categoria",
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

    app.get('/categorias/editar/:id', function(req, res) {
        categoria.get(req.params.id, function(row) {
            res.render('editar', {
                title: 'categoria',
                models: config.models,
                Titulo: "Editar categorias",
                retroceder : "../../",
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
        });
    });

    app.get('/categorias', function (req, res) {
        categoria.all(function (rows) {
            res.render('list', {
                title: 'categoria',
                Titulo: "Gestão de categorias",
                models: config.models,
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
                            link: './categorias/Detalhes/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './categorias/Editar/' + obj.id,
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
    var props = marcaschema.properties;

    //get inserir marcas

    app.get('/marcas/inserir', function(req, res) {
        res.render('inserir', {
            title: 'marca',
            models: config.models,
            retroceder : "../",
            Titulo: "Inserir marca",
            properties : Object.keys(new marca()).map(key => {
                var req = (produtoschema.required.includes(key) ? "required" : "");
                var req = (produtoschema.required.includes(key) ? "required" : "");
                var collumn = props[key];
                var min = ((collumn.minimum != void 0 ) ? "min='"+collumn.minimum+"'": "");
                var max = ((collumn.maximum != void 0 ) ? "max='"+collumn.maximum+"'" : "");
                    return {
                        name: key,
                        required: req,
                        minLenght: min,
                        maxLenght: max
                    };
                }),
            references: function () {
				var allRefs = [];
				if (marcaschema.references) {
				marcaschema.references.forEach(function (ref) {
					allRefs.push({
						label: ref.label,
						model: ref.model
					});
				});
			}
				return allRefs;
			},
        });
    });

    //get detalhes marcas

    app.get('/marcas/detalhes/:id', function (req, res) {
	marca.get(req.params.id, function (row) {
		res.render('details', {
        title: 'marca',
        models: config.models,
        retroceder : "../../",
        Titulo: "Detalhes de marca",
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

    app.get('/marcas/editar/:id', function(req, res) {
        marca.get(req.params.id, function(row) {
            res.render('editar', {
                title: 'marca',
                models: config.models,
                Titulo: "Editar marcas",
                retroceder : "../../",
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
        });
    });

    app.get('/marcas', function (req, res) {
        marca.all(function (rows) {
            res.render('list', {
                title: 'marca',
                Titulo: "Gestão de marcas",
                models: config.models,
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
                            link: './marcas/Detalhes/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './marcas/Editar/' + obj.id,
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
    var props = produtoschema.properties;

    //get inserir produtos

    app.get('/produtos/inserir', function(req, res) {
        res.render('inserir', {
            title: 'produto',
            models: config.models,
            retroceder : "../",
            Titulo: "Inserir produto",
            properties : Object.keys(new produto()).map(key => {
                var req = (produtoschema.required.includes(key) ? "required" : "");
                var req = (produtoschema.required.includes(key) ? "required" : "");
                var collumn = props[key];
                var min = ((collumn.minimum != void 0 ) ? "min='"+collumn.minimum+"'": "");
                var max = ((collumn.maximum != void 0 ) ? "max='"+collumn.maximum+"'" : "");
                    return {
                        name: key,
                        required: req,
                        minLenght: min,
                        maxLenght: max
                    };
                }),
            references: function () {
				var allRefs = [];
				if (produtoschema.references) {
				produtoschema.references.forEach(function (ref) {
					allRefs.push({
						label: ref.label,
						model: ref.model
					});
				});
			}
				return allRefs;
			},
        });
    });

    //get detalhes produtos

    app.get('/produtos/detalhes/:id', function (req, res) {
	produto.get(req.params.id, function (row) {
		res.render('details', {
        title: 'produto',
        models: config.models,
        retroceder : "../../",
        Titulo: "Detalhes de produto",
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

    app.get('/produtos/editar/:id', function(req, res) {
        produto.get(req.params.id, function(row) {
            res.render('editar', {
                title: 'produto',
                models: config.models,
                Titulo: "Editar produtos",
                retroceder : "../../",
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
        });
    });

    app.get('/produtos', function (req, res) {
        produto.all(function (rows) {
            res.render('list', {
                title: 'produto',
                Titulo: "Gestão de produtos",
                models: config.models,
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
                            link: './produtos/Detalhes/' + obj.id,
                            image: {
                                src: '../images/read.png'
                            },
                            tooltip: 'Detalhe'
                        }, {
                            label: '',
                            link: './produtos/Editar/' + obj.id,
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
