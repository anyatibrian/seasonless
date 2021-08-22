import express, { Router } from "express";
import { PaymentController } from "./payment.controller";
const paymentController = new PaymentController();
export const paymentRouter = Router();
paymentRouter
    .route("/payments")
    .all()
    .post(paymentController.makeCustomerPayment)
    .get(paymentController.getAllPaymentDetails);
