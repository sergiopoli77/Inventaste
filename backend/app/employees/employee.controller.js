// Controller untuk handle request dan response
const express = require("express");
const router = express.Router();
const { getEmployeeById, getAllEmployees } = require("./employee.service");

// GET semua employee
router.get("/employees", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json({
      status: "success",
      message: "List of employees",
      data: employees,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET employee by ID
router.get("/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      status: "success",
      message: "Employee data",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;