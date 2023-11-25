const express = require("express");
const UserController = require("../controllers/UserController.js");
const router = express.Router();
router.get(
    "/all",
    UserController.getAllUsers
);

module.exports = router;