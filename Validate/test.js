/************************
 * Importar os módulos
 * utilizados
 */
var Ajv = require("ajv");
var fs = require("fs");
var ajv = Ajv({ allErrors: true });

/******************************
 * Definir os schemas a serem testados
 */
var produto_schema = JSON.parse(fs.readFileSync("./Validate/Produto.json"));
var marca_schema = JSON.parse(fs.readFileSync("./Validate/Marca.json"));
var venda_schema = JSON.parse(fs.readFileSync("./Validate/Venda.json"));

/*************************
 * Criação de objectos para teste
 */
var produto = {
    "nome" : "Teste",
    "modelo" : "teste",
    "preco" : 20.5,
    "informacao" : "ola",
    "stock" : 2,
    "data" : "1995-03-18",
    "marca" : {
        "nome" : "oi"
    }
};

var venda = {
    "quantidade" : 1,
    "data" : "1995-03-18",
    "produto" : {
        "nome" : "Teste",
        "modelo" : "teste",
        "preco" : 20.5,
        "informacao" : "ola",
        "stock" : 2,
        "data" : "1995-03-18",
        "marca" : {
            "nome" : "teste"
        }
    }
};

var marca =  {
    "nome" : "testar"
}
/***********************************
 * Função de teste de schemas
 */
function test(data, schema) {
    console.log(data);
    var validate = ajv.compile(schema);
    var valid = validate(data);
    if (valid) console.log("Valid!");
    else console.log("Invalid: " + ajv.errorsText(validate.errors));
}

/*********************
 * Testes realizados
 */
test(produto, produto_schema);
test(marca, marca_schema);
test(venda, venda_schema);