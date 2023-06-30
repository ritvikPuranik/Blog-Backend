
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Post = sequelize.define(
    "blog_posts",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        meta: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //       }
        // },
        
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = Post;