const express = require("express");
const InsuranceController = require("../controllers/InsuranceController");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:insuranceId",
    InsuranceController.get
    );

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    InsuranceController.getAll
);

router.post(
    "/",
    InsuranceController.create,
);

router.patch(
    "/:insuranceId",
    [UserPermission.checkPermission('admin')],
    InsuranceController.update
);

/*
Commented out b/c use case is not valid.
Do not want to delete records and potentially orphan data as a result
router.delete(
    "/:insuranceId",
    [UserPermission.checkPermission('admin')],
    InsuranceController.delete
)
 */

module.exports = router;