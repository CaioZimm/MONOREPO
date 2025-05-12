const database = require('../../config/database');
const { DataTypes } = require('sequelize');
const Conversion = require('./Conversion');
const Favorite = require('./Favorite');

const User = database.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4]
    }
  }
}, {
    tableName: 'users',
    timestamps: true,
});

// Relationships
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' })
User.hasMany(Conversion, { foreignKey: 'userId', onDelete: 'CASCADE' })

Favorite.belongsTo(User, { foreignKey: 'userId' })
Conversion.belongsTo(User, { foreignKey: 'userId'})

module.exports = User;