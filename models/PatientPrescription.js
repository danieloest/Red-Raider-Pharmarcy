const {DataTypes} = require("sequelize");

const PatientPrescriptionModel = {
    patientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    prescriptionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}
module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("patientPrescription", PatientPrescriptionModel,
            {
                freezeTableName: true,
                tableName: "patient_prescription",
            });
    },

    findOrCreate: (patientPrescription) => {
        let patientId = patientPrescription.patientId;
        let prescriptionId = patientPrescription.prescriptionId;
        return this.model.findOrCreate({
            where: {
                patientId: patientId,
                prescriptionId: prescriptionId
            },
            defaults: {
                patientId: patientId,
                PrescriptionId: prescriptionId,
            }
        })
    },
}