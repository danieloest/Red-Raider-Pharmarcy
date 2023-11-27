const DoctorModel = require("../models/Doctor.js");

module.exports = {
  getDoctor: (req, res) => {
    const {
      params: { doctorId },
    } = req;

    DoctorModel.findDoctor({ id: doctorId })
      .then((doctor) => {
        return res.status(200).json({
          status: true,
          data: {
            doctor,
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

  updateDoctor: (req, res) => {
    const {
      doctor: { doctorId },
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

    DoctorModel.updateDoctor({ id: doctorId }, payload)
      .then(() => {
        return DoctorModel.findDoctor({ id: doctorId });
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

  deleteDoctor: (req, res) => {
    const {
      params: { doctorId },
    } = req;

    DoctorModel.deleteDoctor({ id: doctorId })
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

  getAllDoctors: (req, res) => {
    DoctorModel.findAllDoctors(req.query)
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
