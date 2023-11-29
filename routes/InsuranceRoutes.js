const express = require("express");
const InsuranceController = require("../controllers/InsuranceController");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get(
    "/:insuranceId",
    InsuranceController.getInsurance
    );

router.get(
    "/",
    [UserPermission.checkPermission('admin')],
    InsuranceController.getAllInsurances
);

router.patch(
    "/",
    InsuranceController.updateInsurance
);

router.delete(
    "/:insuranceId",
    [UserPermission.checkPermission('admin')],
    InsuranceController.deleteInsurance
)

module.exports = router;