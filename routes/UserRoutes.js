const express = require("express");
const UserController = require("../controllers/UserController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:userId",
    UserController.get
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    UserController.getAll
);

router.post(
    "/",
    UserController.create,
);

router.patch(
    "/:userId",
    [UserPermission.checkPermission('admin')],
    UserController.update
);

router.delete(
    "/:userId",
    [UserPermission.checkPermission('admin')],
    UserController.delete
);

module.exports = router;