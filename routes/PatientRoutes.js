const express = require("express");
const PatientController = require("../controllers/PatientController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:patientId",
    PatientController.get
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    PatientController.getAll
);

router.post(
    "/",
    PatientController.create,
);

router.patch(
    "/:patientId",
    PatientController.update
);

router.delete(
    "/:patientId",
    PatientController.delete
);

router.post("/createPatient", PatientController.createPatient);

module.exports = router;
