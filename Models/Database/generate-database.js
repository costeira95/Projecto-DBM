var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var mustache = require("mustache");

var db;

function generate(db_name, schemas) {
  var db = new sqlite3.Database("./Publish/Database/" + db_name, () => {
    var query_template = fs
      .readFileSync("./Models/Database/create_table.mustache")
      .toString();

    schemas.forEach(schema => {
      var props = schema.properties;
      var keys = Object.keys(props);
      var required = schema.required;
      var references = schema.references;

      var str_collumns_body = "";
      keys.forEach(key => {
        var collumn = props[key];
        if (collumn.type != undefined){
        str_collumns_body += key + " " + collumn.type;

        if (required.includes(key)) str_collumns_body += " NOT NULL ";

        if (collumn.unique) str_collumns_body += " UNIQUE ";

        if (collumn.minimum !== undefined && collumn.maximum !== undefined) {
          str_collumns_body += " check(" + key + ">=" + collumn.minimum + " and " + key + "<=" + collumn.maximum + ")";
        } else {
          if (collumn.minimum !== undefined)
            str_collumns_body += " check(" + key + ">=" + collumn.minimum + ")";

          if (collumn.maximum !== undefined)
            str_collumns_body += " check(" + key + "<=" + collumn.maximum + ")";
        }
        str_collumns_body += ",";
      }
      });

     
      if (references != null || references != undefined){
        references.forEach(reference => {
           str_collumns_body += reference.model + "_id integer NOT NULL ,"
        });

        references.forEach(reference => {
          str_collumns_body += " FOREIGN KEY (" + reference.model + "_id) REFERENCES " + reference.model + "s(" + reference.model +"_id) ,"
        })
     }
      

      str_collumns_body = str_collumns_body.slice(0, -1);

      var config = {
        table_name: schema.title,
        collumns_body: str_collumns_body
      };

      var output = mustache.render(query_template, config);

      console.log(output);

      db.run(output);
     
    });

    db.close();
  });
}

module.exports.generate = generate;
