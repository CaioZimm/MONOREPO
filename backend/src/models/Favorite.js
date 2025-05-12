const database = require('../../config/database');
const { DataTypes } = require('sequelize');

const Favorite = database.define('Favorite', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cryptoName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'favorites',
    timestamps: false
});

module.exports = Favorite;