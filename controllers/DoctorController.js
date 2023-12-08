const DoctorModel = require("../models/Doctor.js");

module.exports = {
  get: (req, res) => {
    const {
      params: { doctorId },
    } = req;

    DoctorModel.get({ id: doctorId })
      .then((doctor) => {
        return res.status(200).json({
          status: true,
          data: doctor,
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
    const {firstName, lastName, email, address} = req.body;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not create the doctor.",
        },
      });
    }

    const doctor = {
      firstName,
      lastName,
      email,
      address
    }

    DoctorModel.create(doctor)
        .then((data) => { res.status(201).send(data)})
        .catch((err) => { console.log(err.message); res.status(500).end()});
  },

  update: (req, res) => {
    const {
      params: { doctorId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the doctor.",
        },
      });
    }

    DoctorModel.update({ id: doctorId }, payload)
      .then(() => {
        return DoctorModel.get({ id: doctorId });
      })
      .then((doctor) => {
        return res.status(200).json({
          status: true,
          data: doctor.toJSON(),
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
      params: { doctorId },
    } = req;

    DoctorModel.delete({ id: doctorId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfDoctorsDeleted: numberOfEntriesDeleted,
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
    DoctorModel.getAll(req.query)
      .then((doctors) => {
        return res.status(200).json({
          status: true,
          data: doctors,
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
