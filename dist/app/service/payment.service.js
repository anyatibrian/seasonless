"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PaymentService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaymentService = exports.PaymentService = function () {
    function PaymentService() {
        _classCallCheck(this, PaymentService);

        this.updateCustomerPayment = function (customerId, seasionId, amount, Date) {};

        this.getAllCustomerSummery = function (customerId, cb) {
            _index.db.all("SELECT totalRepaid, totalCredit, seasonId,summaryId, created_at FROM customer_summaries WHERE customerId=" + customerId + " ORDER BY created_at ASC", cb);
        };

        this.updateCustomerSummery = function (summeryId, totalRepaid, cb) {
            _index.db.each("UPDATE  customer_summaries SET totalRepaid=" + totalRepaid + " where summaryId = " + summeryId, cb);
        };

        this.createPaymentSummaryReport = function (customerId, seasonId, amount, date, cb) {
            _index.db.each("INSERT INTO repayment_report ( customerId, seasonId, amount, date) VALUES ('" + customerId + "', '" + seasonId + "', '" + amount + "', '" + date + "')", cb);
        };

        this.getAllRepaymentDetail = function (cb) {
            _index.db.all("SELECT * FROM seasons INNER JOIN customer_summaries ON customer_summaries.seasonId=seasons.seasonId INNER JOIN customers ON customer_summaries.customerId=customers.customerId", cb);
        };
    }
    /**
     * TODO:
     * get customers summery for the specified season
     * get customers summery for all the season incase the seasion is not specified
     * update customer summery
     */


    _createClass(PaymentService, [{
        key: "getCustomerSummeryBySeason",
        value: function getCustomerSummeryBySeason(customerId, seasionId, cb) {
            _index.db.each("SELECT totalRepaid, totalCredit, customerId, seasonId,  summaryId FROM customer_summaries WHERE customerId=" + customerId + " and seasonId=" + seasionId, cb);
        }
    }]);

    return PaymentService;
}();