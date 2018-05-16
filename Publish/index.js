var express = require('express');
var app = express();

var server = app.listen(8080, function() {
    var host = server.address().host;
    var port = server.address().port;

    console.log("Listening at http://%s:%s", host, port);
});

app.get("/", function (req, res) 
{
    res.send("Hello World");
});