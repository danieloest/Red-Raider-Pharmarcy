const PatientModel = require("../models/Patient");

module.exports = {
  get: (req, res) => {
    const {
      params: { patientId },
    } = req;

    PatientModel.get({ id: patientId } )
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

  create: (req, res) => {
    const {firstName, lastName, email, phone, address} = req.body;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not create the patient.",
        },
      });
    }

    const patient = {
      firstName,
      lastName,
      email,
      phone,
      address
    }

    PatientModel.create(patient)
        .then((data) => { res.status(201).send(data)})
        .catch((err) => { console.log(err.message); res.status(500).end()});
  },

  update: (req, res) => {
    const {
      params: { patientId },
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

    PatientModel.update({ id: patientId }, payload)
      .then(() => {
        return PatientModel.get({ id: patientId });
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

  delete: (req, res) => {
    const {
      params: { patientId },
    } = req;

    PatientModel.delete({ id: patientId })
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

  getAll: (req, res) => {
    PatientModel.getAll(req.query)
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
