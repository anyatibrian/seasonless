"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PaymentController = undefined;

var _payment = require("../service/payment.service");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paymentService = new _payment.PaymentService();

var PaymentController = exports.PaymentController = function PaymentController() {
    var _this = this;

    _classCallCheck(this, PaymentController);

    this.makeCustomerPayment = function (req, res) {
        var _req$body = req.body,
            seasonId = _req$body.seasonId,
            customerId = _req$body.customerId,
            amount = _req$body.amount;

        if (seasonId === null || seasonId <= 0) {
            return res.status(400).json({
                error: "season is required"
            });
        }
        if (customerId === null || customerId <= 0) {
            return res.status(400).json({
                error: "customer is required"
            });
        }
        if (amount === null) {
            return res.status(400).json({
                error: "customer is required"
            });
        }
        if (seasonId !== undefined) {
            paymentService.getCustomerSummeryBySeason(customerId, seasonId, function (error, data) {
                if (error) {
                    return res.status(400).json({
                        error: error
                    });
                }
                if (data) {
                    var totalRepaid = parseInt(data.totalRepaid) + parseInt(amount);
                    _this._updateCustomerPaymentSummaries(data.summaryId, totalRepaid);
                    _this._generateRePaymentSummaryReport(customerId, seasonId, totalRepaid);
                    return res.status(200).json({
                        message: "payment uploaded successfully"
                    });
                }
            });
        }
        if (seasonId === undefined) {
            paymentService.getAllCustomerSummery(customerId, function (err, data) {
                if (err) {
                    res.status(400).json({
                        error: err
                    });
                }
                if (data) {
                    var lastSummary = void 0;
                    var totalRepaid = void 0;
                    data.forEach(function (element, index, array) {
                        if (element.totalRepaid === element.totalCredit) {
                            lastSummary = array[array.length - 1];
                        }
                    });
                    if (lastSummary) {
                        totalRepaid = parseInt(amount) + lastSummary.totalRepaid;
                        _this._updateCustomerPaymentSummaries(lastSummary.summaryId, totalRepaid);
                        _this._generateRePaymentSummaryReport(customerId, lastSummary.seasonId, totalRepaid);
                    } else {
                        totalRepaid = parseInt(amount) + data[0].totalRepaid;
                        _this._updateCustomerPaymentSummaries(data[0].summaryId, totalRepaid);
                        _this._generateRePaymentSummaryReport(customerId, data[0].summaryId, totalRepaid);
                    }
                }
                return res.status(200).json({
                    message: "payment uploaded successfully"
                });
            });
        }
    };

    this._updateCustomerPaymentSummaries = function (summaryId, totalRepaid) {
        paymentService.updateCustomerSummery(summaryId, totalRepaid, function (err, data) {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
        });
    };

    this._generateRePaymentSummaryReport = function (customerId, seasonId, amount) {
        var today = (0, _moment2.default)().format("YYYY-MM-DD");
        paymentService.createPaymentSummaryReport(customerId, seasonId, amount, today, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
        });
    };

    this.getAllPaymentDetails = function (req, res) {
        paymentService.getAllRepaymentDetail(function (err, data) {
            if (err) {
                return err;
            }
            if (data) {
                res.render("layouts/index.handlebars", {
                    title: "Clients repayments",
                    paymentsInfo: data
                });
            }
        });
    };
}
/**
 * upload customers payment
 */

/**
 * Update the customer payments summaries
 */

/**
 * generate summary report for the season
 */

/**
 * return customers payment detals
 */
;