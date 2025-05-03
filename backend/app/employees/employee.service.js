//Layer service adalah layer untuk handle
//Bussiness logic

const { findAll, findById } = require("./user.repository");

const getAllUsers = async () => {
  const users = await findAll();
  return users;
};

const getUserById = async (id) => {
  const users = await findById(id);
  if (!users) {
    throw Error("User tidak ditemukan");
  }
  return users;
};

module.exports = {
  getAllUsers,
  getUserById,
};