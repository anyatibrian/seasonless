import { PaymentService } from "../service/payment.service";
import moment from "moment";
const paymentService = new PaymentService();
export class PaymentController {
    /**
     * upload customers payment
     */
    makeCustomerPayment = (req, res) => {
        const { seasonId, customerId, amount } = req.body;
        if (seasonId === null || seasonId <= 0) {
            return res.status(400).json({
                error: "season is required",
            });
        }
        if (customerId === null || customerId <= 0) {
            return res.status(400).json({
                error: "customer is required",
            });
        }
        if (amount === null) {
            return res.status(400).json({
                error: "customer is required",
            });
        }
        if (seasonId !== undefined) {
            paymentService.getCustomerSummeryBySeason(
                customerId,
                seasonId,
                (error, data) => {
                    if (error) {
                        return res.status(400).json({
                            error: error,
                        });
                    }
                    if (data) {
                        const totalRepaid =
                            parseInt(data.totalRepaid) + parseInt(amount);
                        this._updateCustomerPaymentSummaries(
                            data.summaryId,
                            totalRepaid
                        );
                        this._generateRePaymentSummaryReport(
                            customerId,
                            seasonId,
                            totalRepaid
                        );
                        return res.status(200).json({
                            message: "payment uploaded successfully",
                        });
                    }
                }
            );
        }
        if (seasonId === undefined) {
            paymentService.getAllCustomerSummery(customerId, (err, data) => {
                if (err) {
                    res.status(400).json({
                        error: err,
                    });
                }
                if (data) {
                    let lastSummary;
                    let totalRepaid;
                    data.forEach((element, index, array) => {
                        if (element.totalRepaid === element.totalCredit) {
                            lastSummary = array[array.length - 1];
                        }
                    });
                    if (lastSummary) {
                        totalRepaid =
                            parseInt(amount) + lastSummary.totalRepaid;
                        this._updateCustomerPaymentSummaries(
                            lastSummary.summaryId,
                            totalRepaid
                        );
                        this._generateRePaymentSummaryReport(
                            customerId,
                            lastSummary.seasonId,
                            totalRepaid
                        );
                    } else {
                        totalRepaid = parseInt(amount) + data[0].totalRepaid;
                        this._updateCustomerPaymentSummaries(
                            data[0].summaryId,
                            totalRepaid
                        );
                        this._generateRePaymentSummaryReport(
                            customerId,
                            data[0].summaryId,
                            totalRepaid
                        );
                    }
                }
                return res.status(200).json({
                    message: "payment uploaded successfully",
                });
            });
        }
    };
    /**
     * Update the customer payments summaries
     */
    _updateCustomerPaymentSummaries = (summaryId, totalRepaid) => {
        paymentService.updateCustomerSummery(
            summaryId,
            totalRepaid,
            (err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: err,
                    });
                }
            }
        );
    };
    /**
     * generate summary report for the season
     */
    _generateRePaymentSummaryReport = (customerId, seasonId, amount) => {
        const today = moment().format("YYYY-MM-DD");
        paymentService.createPaymentSummaryReport(
            customerId,
            seasonId,
            amount,
            today,
            (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
            }
        );
    };
    /**
     * return customers payment detals
     */
    getAllPaymentDetails = (req, res) => {
        paymentService.getAllRepaymentDetail((err, data) => {
            if (err) {
                return err;
            }
            if (data) {
                res.render("layouts/index.handlebars", {
                    title: "Clients repayments",
                    paymentsInfo: data,
                });
            }
        });
    };
}
