const DataTypes = require("sequelize");

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
        this.model = sequelize.define("prescription", PrescriptionModel, {
                freezeTableName: true,
                tableName: "prescription",
            });
        },

    associate: (sequelize) => {
        this.model.belongsToMany(sequelize.model("patient"), {
            through: 'patient_prescription',
            foreignKey: 'prescriptionId',
            as: 'patients',
        });
    },

    create: (prescription) => {
        return this.model.create(prescription);
    },

    get: (id) => {
        return this.model.findByPk(id);
    },

    update: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    getAll: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    delete: (query) => {
        return this.model.destroy({
            where: query
        });
    }
    
}