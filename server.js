var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose')

mongoose.connect('mongodb://localhost/database');

var Customer = new Schema({
    name: { type: String, required: true },
    comment: { type: String }
});
var CustomerModel = mongoose.model('Customer', Customer);

var Invoice = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    amount: { type: Number, required: true }
});
var InvoiceModel = mongoose.model('Invoice', Invoice);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var router = express.Router();
restify.serve(router, CustomerModel);
restify.serve(router, InvoiceModel);
app.use(router);

app.listen(3333, function() {
    console.log("Express server listening on port 3333");
});