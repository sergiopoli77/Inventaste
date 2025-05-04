const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { mongoUrl } = require("./config"); // Mengimpor mongoUrl dari config
const employeeController = require("./app/employees/employee.controller");
const itemController = require("./app/items/item.controller");
const categoryController = require("./app/categories/category.controller"); // Mengimpor category controller
const authController = require("./app/auth/auth.controller"); // Import auth controller
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',  // URL frontend Anda
  credentials: true  // Jika perlu mengirim cookies
}));

// Middleware untuk log request
app.use(logger("dev"));

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware untuk parsing cookie
app.use(cookieParser());

// Middleware untuk file statis (jika ada)
app.use(express.static(path.join(__dirname, "public")));

// Auth routes - Menambahkan route untuk autentikasi
app.use("/", authController); // This will handle the /login endpoint

// Gunakan category controller untuk API kategori
app.use("/api", categoryController);

// Gunakan item controller untuk API item
app.use("/api", itemController);

// Gunakan employee controller untuk API employee
app.use("/api", employeeController);

// Koneksi ke MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Set port untuk server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;