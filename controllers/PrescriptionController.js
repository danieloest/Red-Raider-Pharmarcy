const PrescriptionModel = require("../models/Prescription.js");

module.exports = {
    getPrescription: (req, res) => {
        const {
            params: { prescriptionId },
        } = req;

        PrescriptionModel.findPrescription({ id: prescriptionId })
            .then((prescription) => {
                return res.status(200).json({
                    status: true,
                    data: prescription,
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
            .then((data) => { res.status(201).send(data)})
            .catch((err) => { console.log(err.message); res.status(500).end()});
    },

    updatePrescription: (req, res) => {
        const {
            prescription: { prescriptionId },
            body: payload,
        } = req;

        // IF the payload does not have any keys,
        // THEN we can return an error, as nothing can be updated
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "Body is empty, hence can not update the prescription.",
                },
            });
        }

        PrescriptionModel.updatePrescription({ id: prescriptionId }, payload)
            .then(() => {
                return PrescriptionModel.findPrescription({ id: prescriptionId });
            })
            .then((prescription) => {
                return res.status(200).json({
                    status: true,
                    data: prescription.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    deletePrescription: (req, res) => {
        const {
            params: { prescriptionId },
        } = req;

        PrescriptionModel.deletePrescription({ id: prescriptionId })
            .then((numberOfEntriesDeleted) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfPrescriptionsDeleted: numberOfEntriesDeleted,
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

    getAllPrescriptions: (req, res) => {
        PrescriptionModel.findAllPrescriptions(req.query)
            .then((prescriptions) => {
                return res.status(200).json({
                    status: true,
                    data: prescriptions,
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
