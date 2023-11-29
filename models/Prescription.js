import {DataTypes} from "sequelize";

const PrescriptionModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    "MaxDosage (mg)": {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("prescription", PrescriptionModel);
    },

    createPrescription: (prescription) => {
        return this.model.create(prescription);
    },

    findPrescription: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updatePrescription: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllPrescriptions: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deletePrescription: (query) => {
        return this.model.destroy({
            where: query
        });
    }
    
}