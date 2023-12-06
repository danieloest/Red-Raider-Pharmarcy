const express = require("express");
const PatientController = require("../controllers/PatientController.js");
const router = express.Router();

router.get("/:patientId", PatientController.getPatient);

router.get("/", PatientController.getAllPatients);

router.patch("/", PatientController.updatePatient);

router.delete("/:patientId", PatientController.deletePatient);

module.exports = router;
