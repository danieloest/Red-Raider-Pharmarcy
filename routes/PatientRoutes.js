const express = require("express");
const PatientController = require("../controllers/PatientController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:patientId",
    PatientController.getPatient
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    PatientController.getAllPatients
);

router.post(
    "/",
    PatientController.create,
);

router.patch(
    "/",
    PatientController.updatePatient
);

router.delete(
    "/:patientId",
    PatientController.deletePatient
);

module.exports = router;
