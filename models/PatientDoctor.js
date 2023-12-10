const {DataTypes} = require("sequelize");

const PatientDoctorModel = {
    patientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}
module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("patientDoctor", PatientDoctorModel,
            {
                freezeTableName: true,
                tableName: "patient_doctor",
            });
    },

    findOrCreate: (patientDoctor) => {
        let patientId = patientDoctor.patientId;
        let doctorId = patientDoctor.doctorId;
        return this.model.findOrCreate({
            where: {
                patientId: patientId,
                doctorId: doctorId
            },
            defaults: {
                patientId: patientId,
                doctorId: doctorId,
            }
        })
    },
}