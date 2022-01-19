"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mainRoute_1 = require("./router/mainRoute");
var app = express();
app.use('/', mainRoute_1.router);
app.listen(process.env.PORT || 8080, function () {
    console.log('Listening!');
});
