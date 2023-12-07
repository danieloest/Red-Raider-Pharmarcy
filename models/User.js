const DataTypes = require("sequelize");

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        enum: ["admin", "doctor", "patient"],
        allowNull: false
    },
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("user", UserModel,
            {freezeTableName: true,
            tableName: "user",
            });
    },

    createUser: (user) => {
        this.model.create(user)

    },

    findUser: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    updateUser: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },

    findAllUsers: (query) => {
        return this.model.findAll({
            where: query
        });
    },

    deleteUser: (query) => {
        return this.model.destroy({
            where: query
        });
    }
};