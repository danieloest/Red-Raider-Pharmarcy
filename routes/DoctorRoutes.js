const express = require("express");
const DoctorController = require("../controllers/DoctorController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:doctorId",
    DoctorController.getDoctor
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    DoctorController.getAllDoctors
);

router.post(
    "/",
    DoctorController.create,
);

router.patch(
    "/",
    DoctorController.updateDoctor
);

router.delete(
    "/:doctorId",
    DoctorController.deleteDoctor
);

module.exports = router;
