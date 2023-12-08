const InsuranceModel = require("../models/Insurance.js");

module.exports = {
  get: (req, res) => {
    const {
      params: { insuranceId },
    } = req;

    InsuranceModel.get({ id: insuranceId })
      .then((insurance) => {
        return res.status(200).json({
          status: true,
          data: insurance,
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
        .then((data) => { res.status(201).send(data)})
        .catch((err) => { console.log(err.message); res.status(500).end()});
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
        return InsuranceModel.get({ id: insuranceId });
      })
      .then((insurance) => {
        return res.status(200).json({
          status: true,
          data: insurance.toJSON(),
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
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAll: (req, res) => {
    InsuranceModel.getAll(req.query)
      .then((insurances) => {
        return res.status(200).json({
          status: true,
          data: insurances,
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