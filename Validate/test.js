var Ajv = require("ajv");
var fs = require("fs");
var ajv = Ajv({ allErrors: true });

var produto_schema = JSON.parse(fs.readFileSync("./Validate/Produto.json"));
var marca_schema = JSON.parse(fs.readFileSync("./Validate/Marca.json"));

var produto = {
    "nome" : "Teste",
    "modelo" : "teste",
    "preco" : 20.5,
    "informacao" : "ola",
    "data" : "1995-03-18",
    "marca" : {
        "nome" : "oi"
    }
};

var marca =  {
    "nome" : "testar"
}

var validate = ajv.compile(produto_schema);

function test(data) {
    console.log(data);
    var valid = validate(data);
    if (valid) console.log("Valid!");
    else console.log("Invalid: " + ajv.errorsText(validate.errors));
}

var validate_marca = ajv.compile(marca_schema);
function test_marca(data) {
    console.log(data);
    var valid = validate_marca(data);
    if (valid) console.log("Valid!");
    else console.log("Invalid: " + ajv.errorsText(validate_marca.errors));
}


test(produto);
//test_marca(marca);