// Layer repository untuk komunikasi dengan database

const Employee = require("./employee.model");

const findAllEmployees = async () => {
  const employees = await Employee.find(); // Mengambil semua karyawan
  return employees;
};

const findEmployeeById = async (id) => {
  const employee = await Employee.findById(id); // Mengambil karyawan berdasarkan ID
  return employee;
};

module.exports = {
  findAllEmployees,
  findEmployeeById,
};
