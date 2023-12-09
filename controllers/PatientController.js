const PatientModel = require("../models/Patient");
const InsuranceModel = require("../models/Insurance");
const PatientDoctorModel = require("../models/PatientDoctor");
const PatientPrescriptionModel = require("../models/PatientPrescription");

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
    const {firstName, lastName, email, phone, address, insuranceId} = req.body;

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
      address,
      insuranceId
    }

    InsuranceModel.get( {id: insuranceId} )
        .then(
            PatientModel.create(patient, {insuranceId: insuranceId})
                .then((data) => {
                  res.status(201).send(data)
                })
                .catch((err) => {
                  console.log(err.message);
                  res.status(500).end()
                })
        )
        .catch(() => {
          return res.status(500).json({
            status: false,
            error: "Insurance does not exist",
          });
        })
  },

  update: (req, res) => {
    const {
      params: { patientId },
      body: payload,
    } = req;

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

  addDoctor: (req, res) => {
    const {
      params: { patientId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not add doctors to the patient.",
        },
      });
    }

    const doctorId = payload.doctorId;

    const patientDoctor = {
      patientId,
      doctorId,
    };

    PatientDoctorModel.findOrCreate(patientDoctor)
        .then(([data]) => {
          res.status(201).json({
            status: true,
            data: data
          });
        })
        .catch(() => {
          res.status(500).json({
            status: false,
            error: {
              message: "Patient or Doctor does not exist.",
            },
          })
        });
  },

  addPrescription: (req, res) => {
    const {
      params: { patientId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not add doctors to the patient.",
        },
      });
    }

    const prescriptionId = payload.prescriptionId;

    const patientPrescription = {
      patientId,
      prescriptionId,
    };

    PatientPrescriptionModel.findOrCreate(patientPrescription)
        .then(([data]) => {
          res.status(201).json({
            status: true,
            data: data
          });
        })
        .catch(() => {
          res.status(500).json({
            status: false,
            error: {
              message: "Patient or Prescription does not exist.",
            },
          })
        });
  },
};
