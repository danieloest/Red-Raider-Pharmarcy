const express = require("express");
const DoctorController = require("../controllers/DoctorController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:doctorId",
    DoctorController.get
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    DoctorController.getAll
);

router.post(
    "/",
    DoctorController.create,
);

router.patch(
    "/:doctorId",
    DoctorController.update
);

router.delete(
    "/:doctorId",
    DoctorController.delete
);

module.exports = router;
