const DataTypes = require("sequelize");

const PatientModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("patient", PatientModel, {
      freezeTabkeName: true,
      tableName: "patient",
    });
  },

  createPatient: (patient) => {
    return this.model.create(patient);
  },

  findPatient: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updatePatient: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllPatients: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deletePatient: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
