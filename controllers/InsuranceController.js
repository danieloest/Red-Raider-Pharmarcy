const InsuranceModel = require("../models/Insurance.js");

module.exports = {
  get: (req, res) => {
    const {
      params: { insuranceId },
    } = req;

    InsuranceModel.get(insuranceId)
        .then((insurance) => {
          return res.status(200).json({
            status: true,
            data: insurance,
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "Insurance was not found.",
          });
        });
  },

  create: (req, res) => {
    const {name, phone, address} = req.body;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not create the insurance.",
        },
      });
    }

    const insurance = {
      name,
      phone,
      address
    }

    InsuranceModel.create(insurance)
        .then((insurance) => {
          return res.status(201).json({
            status: true,
            data: insurance,
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "Insurance was not created.",
          });
        });
  },

  update: (req, res) => {
    const {
      params: { insuranceId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the insurance.",
        },
      });
    }

    InsuranceModel.update({ id: insuranceId }, payload)
      .then(() => {
        return InsuranceModel.get(insuranceId);
      })
        .then((insurance) => {
          return res.status(200).json({
            status: true,
            data: insurance,
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "Insurance was not updated.",
          });
        });
  },

  delete: (req, res) => {
    const {
      params: { insuranceId },
    } = req;

    InsuranceModel.delete({ id: insuranceId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfInsurancesDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          status: false,
          error: "Insurance was not deleted.",
        });
      });
  },

  getAll: (req, res) => {
    InsuranceModel.getAll(req.query)
        .then((insurance) => {
          return res.status(200).json({
            status: true,
            data: insurance,
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "Insurances were not found.",
          });
        });
  },
};