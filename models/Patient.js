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
          {
            as: "doctors",
            model: sequelize.model("doctor"),
          },
          {
            as: "prescriptions",
            model: sequelize.model("prescription"),
          },
        ],
      },
      freezeTableName: true,
      tableName: "patient",
    });
  },

  associate: (sequelize) => {
    this.model.belongsTo(sequelize.model("insurance"));
    this.model.belongsToMany(sequelize.model("prescription"), {
      through: "patient_prescription",
      foreignKey: "patientId",
      as: "prescriptions",
    });
    this.model.belongsToMany(sequelize.model("doctor"), {
      through: "patient_doctor",
      foreignKey: "patientId",
      as: "doctors",
    });
  },

  create: (patient) => {
    return this.model.create(patient);
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
    console.log(query);
    // Request from Postman
    if (Object.keys(query).length === 0) {
      return this.model.findAll({
        where: query,
      });
    }
    // For WHERE statements
    else {
      return this.model.findAll({
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
    }
  },

  delete: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
