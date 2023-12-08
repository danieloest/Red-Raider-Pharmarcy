const express = require("express");
const PrescriptionController = require("../controllers/PrescriptionController");
const router = express.Router();

router.get(
    "/:prescriptionId",
    PrescriptionController.getPrescription
);

router.get(
    "/",
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