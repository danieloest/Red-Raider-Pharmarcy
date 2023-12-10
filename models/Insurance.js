const DataTypes = require("sequelize");

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
        this.model = sequelize.define("insurance", InsuranceModel,
            {
                freezeTableName: true,
                tableName: "insurance",
            });
    },

    create: (insurance) => {
        return this.model.create(insurance);
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
};