const express = require("express");
const PatientController = require("../controllers/PatientController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:patientId",
    PatientController.get,
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    PatientController.getAll,
);

router.post(
    "/",
    PatientController.create,
);

router.patch(
    "/:patientId",
    [UserPermission.checkPermission('admin')],
    PatientController.update,
);

/*
Commented out b/c use case is not valid.
Do not want to delete records and potentially orphan data as a result
router.delete(
    "/:patientId",
    PatientController.delete,
);
 */

router.post(
    "/:patientId/doctor",
    [UserPermission.checkPermission('admin')],
    PatientController.addDoctor,
)

router.post(
    "/:patientId/prescription",
    [UserPermission.checkPermission('admin')],
    PatientController.addPrescription,
)

module.exports = router;
