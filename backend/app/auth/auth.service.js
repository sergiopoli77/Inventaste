const jwt = require("jsonwebtoken");
const Employee = require("../employees/employee.model");

require("dotenv").config();

const login = async (username, password) => {
  const user = await Employee.findOne({ username });

  if (!user) {
    throw new Error("Username tidak ditemukan");
  }

  if (password !== user.password) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1d" }
  );

  return token;
};

module.exports = {
  login,
};
