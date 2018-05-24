var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api','./Controllers/api.js');

var server = app.listen(8080,function () {
    console.log('Example app listening on port 8080')
});