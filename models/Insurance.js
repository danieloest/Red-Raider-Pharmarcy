const {DataTypes} = require("sequelize");
const InsuranceModel = {
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
}

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("insurance", InsuranceModel);
    },
    createInsurance: (insurance) => {
        return this.model.create(insurance);
    },

    findInsurance: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateInsurance: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllInsurances: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteInsurance: (query) => {
        return this.model.destroy({
            where: query
        });
    }
};