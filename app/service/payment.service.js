import { db } from "../index";
export class PaymentService {
    constructor() {}
    /**
     * TODO:
     * get customers summery for the specified season
     * get customers summery for all the season incase the seasion is not specified
     * update customer summery
     */
    updateCustomerPayment = (customerId, seasionId, amount, Date) => {};
    getCustomerSummeryBySeason(customerId, seasionId, cb) {
        db.each(
            `SELECT totalRepaid, totalCredit, customerId, seasonId,  summaryId FROM customer_summaries WHERE customerId=${customerId} and seasonId=${seasionId}`,
            cb
        );
    }
    getAllCustomerSummery = (customerId, cb) => {
        db.all(
            `SELECT totalRepaid, totalCredit, seasonId,summaryId, created_at FROM customer_summaries WHERE customerId=${customerId} ORDER BY created_at ASC`,
            cb
        );
    };
    updateCustomerSummery = (summeryId, totalRepaid, cb) => {
        db.each(
            `UPDATE  customer_summaries SET totalRepaid=${totalRepaid} where summaryId = ${summeryId}`,
            cb
        );
    };
    createPaymentSummaryReport = (customerId, seasonId, amount, date, cb) => {
        db.each(
            `INSERT INTO repayment_report ( customerId, seasonId, amount, date) VALUES ('${customerId}', '${seasonId}', '${amount}', '${date}')`,
            cb
        );
    };
    getAllRepaymentDetail = (cb) => {
        db.all(
            `SELECT * FROM seasons INNER JOIN customer_summaries ON customer_summaries.seasonId=seasons.seasonId INNER JOIN customers ON customer_summaries.customerId=customers.customerId`,
            cb
        );
    };
}
