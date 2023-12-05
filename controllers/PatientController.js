const PatientModel = require("../models/Patient");
// Used to get the name of the patient's insurance to send in the Create Patient response
const InsuranceModel = require("../models/Insurance");

module.exports = {
  getPatient: (req, res) => {
    const {
      params: { patientId },
    } = req;

    PatientModel.findPatient({ id: patientId })
      .then((patient) => {
        return res.status(200).json({
          status: true,
          data: patient,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createPatient: (req, res) => {
    // If the request comes from the website
    if (Object.keys(req.query).length === 0) {
      newPatient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        insuranceId: req.body.insuranceId,
      };
    }
    // If the command comes from Postman
    else {
      newPatient = req.query;
    }
    PatientModel.createPatient(newPatient)
      .then((patient) => {
        // For website
        if (Object.keys(req.query).length === 0) {
          var insurances_promise = InsuranceModel.findInsurance(
            patient.dataValues.insuranceId
          );
          insurances_promise.then((insurances) => {
            patient.dataValues.insurance = insurances.dataValues.name;
            return res.render("newPatientConfirmation.ejs", { patient });
          });
        }
        // For Postman
        else {
          return res.status(200).json({
            status: true,
            data: patient.toJSON(),
          });
        }
      })
      .catch((err) => {
        // return res.status(500).json({
        //   status: false,
        //   error: err,
        // });
        // For website
        if (Object.keys(req.query).length === 0) {
          return res.render("errorPage.ejs", {
            errorMessage: "There was an error creating the patient.",
          });
        }
        // For Postman
        else {
          return res.status(500).json({
            status: false,
            error: err,
          });
        }
      });
  },

  updatePatient: (req, res) => {
    const {
      patient: { patientId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the patient.",
        },
      });
    }

    PatientModel.updatePatient({ id: patientId }, payload)
      .then(() => {
        return PatientModel.findPatient({ id: patientId });
      })
      .then((patient) => {
        return res.status(200).json({
          status: true,
          data: patient.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deletePatient: (req, res) => {
    const {
      params: { patientId },
    } = req;

    PatientModel.deletePatient({ id: patientId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfPatientsDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllPatients: (req, res) => {
    PatientModel.findAllPatients(req.query)
      .then((patients) => {
        return res.status(200).json({
          status: true,
          data: patients,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
