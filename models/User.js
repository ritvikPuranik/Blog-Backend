
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const User = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meta: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        /**
         * Other model options go here
         */
    }
);

module.exports = User;