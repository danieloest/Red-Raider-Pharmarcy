const DataTypes = require("sequelize");
const { Op } = require("sequelize");

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
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  insuranceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("patient", PatientModel, {
      defaultScope: {
        include: [
          {
            as: "insurance",
            model: sequelize.model("insurance"),
          },
        ],
      },
      freezeTableName: true,
      tableName: "patient",
    });
    this.model.belongsTo(sequelize.model("insurance"));
  },

  createPatient: (patient) => {
    return this.model.create({
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      insuranceId: parseInt(patient.insuranceId),
    });
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
    // Request from Postman
    if (Object.keys(query).length === 0) {
      return this.model.findAll({
        where: query,
      });
    }
    console.log("query in model: ");
    console.log(query);
    // Request from site
    return this.model.findAll({
      // where: query,
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: "%" + query.searchTerm + "%" } },
          { lastName: { [Op.like]: "%" + query.searchTerm + "%" } },
          { email: { [Op.like]: "%" + query.searchTerm + "%" } },
          { phone: { [Op.like]: "%" + query.searchTerm + "%" } },
          { address: { [Op.like]: "%" + query.searchTerm + "%" } },
        ],
      },
    });
  },

  deletePatient: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
