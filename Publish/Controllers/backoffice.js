var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './StaticFiles');



//categorias

    var categoria = require('./../Models/categoria.js');

    app.get('/categoria/inserir', function(req, res) {
        res.render('form', {
            properties : Object.keys(new categoria()).map(key => {
                    return {
                        name: key
                    };
                })
        });
    });

    app.get('/categoria/detalhe/:id', function(req, res) {
        categoria.get(req.params.id, function(row) {
            res.render('details', {
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
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

    app.get('/marca/inserir', function(req, res) {
        res.render('form', {
            properties : Object.keys(new marca()).map(key => {
                    return {
                        name: key
                    };
                })
        });
    });

    app.get('/marca/detalhe/:id', function(req, res) {
        marca.get(req.params.id, function(row) {
            res.render('details', {
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
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

    app.get('/produto/inserir', function(req, res) {
        res.render('form', {
            properties : Object.keys(new produto()).map(key => {
                    return {
                        name: key
                    };
                })
        });
    });

    app.get('/produto/detalhe/:id', function(req, res) {
        produto.get(req.params.id, function(row) {
            res.render('details', {
                properties : Object.getOwnPropertyNames(row).map(key => {
                    return {
                        name : key,
                        value : row[key]
                    }
                })
            });
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
