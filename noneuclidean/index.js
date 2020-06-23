const track = require('noneucldiean');

const express = require("express");
const app = express();
const server = app.listen(80);
var path = require("path");

//expose the local public folder for inluding files js, css etc..
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

