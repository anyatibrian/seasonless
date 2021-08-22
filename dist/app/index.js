"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.db = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _payment = require("./resource/payment.controller");

var _payments = require("./resource/payments.router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqlite3 = require("sqlite3").verbose();

/**
 * setting up the express app
 */
var app = (0, _express2.default)();
var PORT = 3000 || process.env.PORT;
var prefix = "/";
/**
 * set template engine
 */
app.engine("handlebars", (0, _expressHandlebars2.default)({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(_express2.default.static("images"));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)("dev"));
/**
 * establish connection to the databases
 */
var db = exports.db = new sqlite3.Database("./payment.db", function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the database.");
    }
});
app.use("" + prefix, _payments.paymentRouter);
app.listen(PORT, function () {
    console.log("the server is up and running on  http://localhost:" + PORT);
});