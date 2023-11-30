const PatientModel = require("../models/Patient");

module.exports = {
  getPatient: (req, res) => {
    const {
      params: { patientId },
    } = req;

    PatientModel.findPatient({ id: patientId } )
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
    PatientModel.createPatient(req.query)
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
