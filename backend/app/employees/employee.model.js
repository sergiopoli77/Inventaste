const mongoose = require("mongoose");

// Membuat Schema untuk Employee
const employeeSchema = mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true // Pastikan username unik
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["staff", "admin"], // Hanya bisa staff atau admin
      default: "staff" // Default role adalah staff
    },
    photoUrl: { 
      type: String, 
      required: false 
    },
    checkInTime: { 
      type: Date, 
      required: false 
    },
  },
  {
    versionKey: false, // Tidak menambahkan __v ke setiap dokumen
    timestamps: true,  // Menambahkan createdAt dan updatedAt
  }
);

// Membuat Model untuk Employee
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;