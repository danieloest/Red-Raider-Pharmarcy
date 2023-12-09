const express = require("express");
const PrescriptionController = require("../controllers/PrescriptionController");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:prescriptionId",
    PrescriptionController.get
);

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    PrescriptionController.getAll
);

router.post(
    "/",
    PrescriptionController.create,
);

router.patch(
    "/:prescriptionId",
    PrescriptionController.update
);

router.delete(
    "/:prescriptionId",
    PrescriptionController.delete
);

module.exports = router;