const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { mongoUrl } = require("./config"); // Mengimpor mongoUrl dari config
const employeeController = require("./app/employees/employee.controller");
const itemController = require("./app/items/item.controller"); // Tambahkan ini

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
app.use("/api/employees", employeeController);

// Gunakan item controller untuk API items
app.use("/api/items", itemController); // Tambahkan ini

// Koneksi ke MongoDB (tanpa opsi deprecated)
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Set port untuk server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
