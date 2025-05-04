const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Employee = require("../employees/employee.model");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config");

const login = async (email, password) => {
  const user = await Employee.findOne({ email });
  if (!user) throw new Error("Email tidak ditemukan");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
};

module.exports = { login };
