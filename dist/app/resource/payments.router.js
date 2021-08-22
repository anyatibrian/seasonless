"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paymentRouter = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _payment = require("./payment.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paymentController = new _payment.PaymentController();
var paymentRouter = exports.paymentRouter = (0, _express.Router)();
paymentRouter.route("/payments").all().post(paymentController.makeCustomerPayment).get(paymentController.getAllPaymentDetails);