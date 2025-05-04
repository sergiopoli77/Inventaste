const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Employee = require("../employees/employee.model");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config");

// Fungsi login dan pembuatan token
const login = async (email, password) => {
  const user = await Employee.findOne({ email });
  
  // Jika user tidak ditemukan
  if (!user) throw new Error("Email tidak ditemukan");

  // Validasi password yang dimasukkan
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  // Membuat token JWT dengan role dan data user lainnya
  const token = jwt.sign(
    { 
      id: user._id,      // ID pengguna
      role: user.role,   // Role pengguna (admin/staff)
      name: user.name    // Nama pengguna (untuk informasi pengguna)
    },
    JWT_SECRET,           // Secret key untuk sign token
    { expiresIn: JWT_EXPIRES_IN }  // Waktu kadaluarsa token
  );

  return { token, user };  // Mengembalikan token dan data user
};

module.exports = { login };
