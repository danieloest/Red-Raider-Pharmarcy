const express = require("express");
const DoctorController = require("../controllers/DoctorController.js");
const router = express.Router();

router.get("/:doctorId", DoctorController.getDoctor);

router.get("/", DoctorController.getAllDoctors);

router.patch("/", DoctorController.updateDoctor);

router.delete("/:userId", DoctorController.deleteDoctor);

module.exports = router;
