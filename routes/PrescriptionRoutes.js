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
    [UserPermission.checkPermission('admin')],
    PrescriptionController.update
);

/*
Commented out b/c use case is not valid.
Do not want to delete records and potentially orphan data as a result
router.delete(
    "/:prescriptionId",
    PrescriptionController.delete
);
 */

module.exports = router;