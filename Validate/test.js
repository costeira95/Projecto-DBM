var Ajv = require("ajv");
var fs = require("fs");
var ajv = Ajv({ allErrors: true });

var schema_categoria = JSON.parse(fs.readFileSync("./Models/Schemas/categoria.json"));
var categorias = JSON.parse(fs.readFileSync("./Validate/categorias.json"));

var schema_marca = JSON.parse(fs.readFileSync("./Models/Schemas/marca.json"));
var marcas = JSON.parse(fs.readFileSync("./Validate/marcas.json"));


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

test(categorias[0], schema_categoria);
test(categorias[1], schema_categoria);

test(marcas[0], schema_marca);
test(marcas[1], schema_marca);