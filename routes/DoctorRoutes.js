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
    [UserPermission.checkPermission('admin')],
    DoctorController.update
);

/*
Commented out b/c use case is not valid.
Do not want to delete records and potentially orphan data as a result

router.delete(
    "/:doctorId",
    DoctorController.delete
);
 */

module.exports = router;
