const DataTypes = require("sequelize");

const DoctorModel = {
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("doctor", DoctorModel,
        {
          freezeTableName: true,
          tableName: "doctor",
        });
  },

  createDoctor: (doctor) => {
    return this.model.create(doctor);
  },

  findDoctor: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateDoctor: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllDoctors: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteDoctor: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
