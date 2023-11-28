const express = require("express");
const UserController = require("../controllers/UserController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:userId",
    UserController.getUser
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    UserController.getAllUsers
);

router.patch(
    "/",
    UserController.updateUser
);

router.delete(
    "/:userId",
    [UserPermission.checkPermission('admin')],
    UserController.deleteUser
);

module.exports = router;