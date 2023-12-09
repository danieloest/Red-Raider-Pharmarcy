const express = require("express");
const PatientController = require("../controllers/PatientController.js");
const UserPermission = require("../middleware/UserPermission");
const router = express.Router();

router.get("/:patientId", PatientController.get);

router.get(
  "/",
  // Commented out the permissions so that it would work on the website
  //   [UserPermission.checkPermission("admin")],
  PatientController.getAll
);

router.post("/", PatientController.create);

router.patch("/:patientId", PatientController.update);

router.delete("/:patientId", PatientController.delete);

module.exports = router;
