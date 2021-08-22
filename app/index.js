import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
const sqlite3 = require("sqlite3").verbose();
import path from "path";
import exphbs from "express-handlebars";
import { PaymentController } from "./resource/payment.controller";
import { paymentRouter } from "./resource/payments.router";
/**
 * setting up the express app
 */
const app = express();
const PORT = 3000 || process.env.PORT;
const prefix = "/";
/**
 * set template engine
 */
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
/**
 * establish connection to the databases
 */
export const db = new sqlite3.Database("./payment.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the database.");
    }
});
app.use(`${prefix}`, paymentRouter);
app.listen(PORT, () => {
    console.log(`the server is up and running on  http://localhost:${PORT}`);
});
