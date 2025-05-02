//Layer controller untuk handle req dan res
// Validasi body

const express = require("express");
const router = express.Router();
const { getUserById, getAllUsers } = require("./user.service");

/* GET users listing. */
router.get("/users", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json({
      status: "success!!!",
      message: "list users",
      data: users,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await getUserById(id);
    res.json({
      status: "success",
      message: "list users",
      data: users,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;