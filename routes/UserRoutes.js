const express = require("express");
const UserController = require("../controllers/UserController.js");
const router = express.Router();

router.get(
    "/:userId",
    UserController.getUser
);

router.get(
    "/all",
    UserController.getAllUsers
);

router.patch(
    "/",
    UserController.updateUser
);

router.delete(
    "/:userId",
    UserController.deleteUser
);

module.exports = router;