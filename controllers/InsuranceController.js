const InsuranceModel = require("../models/Insurance.js");

module.exports = {
  getInsurance: (req, res) => {
    const {
      params: { insuranceId },
    } = req;

    InsuranceModel.findInsurance({ id: insuranceId })
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

  updateInsurance: (req, res) => {
    const {
      insurance: { insuranceId },
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

    InsuranceModel.updateInsurance({ id: insuranceId }, payload)
      .then(() => {
        return InsuranceModel.findInsurance({ id: insuranceId });
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

  deleteInsurance: (req, res) => {
    const {
      params: { insuranceId },
    } = req;

    InsuranceModel.deleteInsurance({ id: insuranceId })
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

  getAllInsurances: (req, res) => {
    InsuranceModel.findAllInsurances(req.query)
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