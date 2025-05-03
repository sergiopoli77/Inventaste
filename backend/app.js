const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const employeeController = require("./app/employees/employee.controller"); // Pastikan path-nya benar

const app = express();

// Middleware untuk log request
app.use(logger("dev"));

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware untuk parsing cookie
app.use(cookieParser());

// Middleware untuk file statis (jika ada)
app.use(express.static(path.join(__dirname, "public")));

// Gunakan employee controller untuk API employee
app.use("/api", employeeController); // Sesuaikan route sesuai dengan kebutuhan kamu

module.exports = app;
