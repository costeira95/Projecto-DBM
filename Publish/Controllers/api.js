var express = require('express');
var router = express.Router();

var categoria = require('../Models/categoria.js');
var marca = require('../Models/marca.js');
var produto = require('../Models/produto.js');


function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
            obj[value] = object[value];
    });
    return obj;
}

//categorias

router.post('/categoria', function (req, res) {
    mapping(req.body, categoria).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo categoria
});

router.get('/categoria', function (req, res) {
    categoria.all(function (rows) { //função de callback que quando for retornado os dados na base dedados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/categoria/:id', function (req, res) {
    categoria.get(req.params.id, function (row) {
        res.json(row);
    });
});

router.put('/categoria/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como porparâmetro no url
    var obj = mapping(req.body, categoria);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/categoria/:id', function (req, res) {
    categoria.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

router.get('/categoria/:model/:id', function (req, res) {
    categoria.many(req.params.model, req.params.id, function (rows) {
        res.json(rows);
    });
});


//marcas

router.post('/marca', function (req, res) {
    mapping(req.body, marca).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo marca
});

router.get('/marca', function (req, res) {
    marca.all(function (rows) { //função de callback que quando for retornado os dados na base dedados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/marca/:id', function (req, res) {
    marca.get(req.params.id, function (row) {
        res.json(row);
    });
});

router.put('/marca/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como porparâmetro no url
    var obj = mapping(req.body, marca);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/marca/:id', function (req, res) {
    marca.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

router.get('/marca/:model/:id', function (req, res) {
    marca.many(req.params.model, req.params.id, function (rows) {
        res.json(rows);
    });
});


//produtos

router.post('/produto', function (req, res) {
    mapping(req.body, produto).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo produto
});

router.get('/produto', function (req, res) {
    produto.all(function (rows) { //função de callback que quando for retornado os dados na base dedados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/produto/:id', function (req, res) {
    produto.get(req.params.id, function (row) {
        res.json(row);
    });
});

router.put('/produto/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como porparâmetro no url
    var obj = mapping(req.body, produto);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/produto/:id', function (req, res) {
    produto.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

router.get('/produto/:model/:id', function (req, res) {
    produto.many(req.params.model, req.params.id, function (rows) {
        res.json(rows);
    });
});


module.exports = router;