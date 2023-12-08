const express = require("express");
const PrescriptionController = require("../controllers/PrescriptionController");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:prescriptionId",
    PrescriptionController.getPrescription
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    PrescriptionController.getAllPrescriptions
);

router.post(
    "/",
    PrescriptionController.create,
);

router.patch(
    "/",
    PrescriptionController.updatePrescription
);

router.delete(
    "/:prescriptionId",
    PrescriptionController.deletePrescription
);

module.exports = router;