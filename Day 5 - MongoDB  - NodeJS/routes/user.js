const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/getAllUsers", userController.getAllUsers);

router.put("/editUser:email", userController.editUser);

router.delete("/deleteUser:email", userController.deleteUser);

module.exports = router;
