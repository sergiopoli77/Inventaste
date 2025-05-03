// Layer service untuk menangani logika bisnis terkait karyawan

const { findAllEmployees, findEmployeeById } = require("./employee.repository");

const getAllEmployees = async () => {
  const employees = await findAllEmployees();
  return employees;
};

const getEmployeeById = async (id) => {
  const employee = await findEmployeeById(id);
  if (!employee) {
    throw Error("Karyawan tidak ditemukan");
  }
  return employee;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
};
