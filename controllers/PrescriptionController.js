const PrescriptionModel = require("../models/Prescription.js");

module.exports = {
    get: (req, res) => {
        const {
            params: { prescriptionId },
        } = req;

        PrescriptionModel.get(prescriptionId)
            .then((prescription) => {
                return res.status(200).json({
                    status: true,
                    data: prescription,
                })})
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    status: false,
                    error: "Prescription was not found.",
                });
            });
    },

    create: (req, res) => {

        const {name, price, "MaxDosage (mg)": MaxDosage} = req.body;

        if (!Object.keys(req.body).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body is empty, hence can not create the prescription.",
                },
            });
        }

        console.log(name, price, MaxDosage)

        const prescription = {
            name,
            price,
            "MaxDosage (mg)": MaxDosage
        }

        PrescriptionModel.create(prescription)
            .then((prescription) => {
                return res.status(201).json({
                    status: true,
                    data: prescription,
                })})
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    status: false,
                    error: "Prescription was not created.",
                });
            });
    },

    update: (req, res) => {
        const {
            params: { prescriptionId },
            body: payload,
        } = req;

        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body is empty, hence can not update the prescription.",
                },
            });
        }

        PrescriptionModel.update({ id: prescriptionId }, payload)
            .then((prescription) => {
                return res.status(200).json({
                    status: true,
                    data: prescription,
                })})
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    status: false,
                    error: "Prescription was not updated.",
                });
            });
    },

    delete: (req, res) => {
        const {
            params: { prescriptionId },
        } = req;

        PrescriptionModel.delete({ id: prescriptionId })
            .then((numberOfEntriesDeleted) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfPrescriptionsDeleted: numberOfEntriesDeleted,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    status: false,
                    error: "Prescription was not deleted.",
                });
            });
    },

    getAll: (req, res) => {
        PrescriptionModel.getAll(req.query)
            .then((prescriptions) => {
                return res.status(200).json({
                    status: true,
                    data: prescriptions,
                })})
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    status: false,
                    error: "Prescriptions were not found.",
                });
            });
    },
};
