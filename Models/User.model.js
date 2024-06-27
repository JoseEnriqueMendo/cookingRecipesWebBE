const { DataTypes } = require('sequelize');
const { client_squalize } = require('../db/index');

const User = client_squalize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [6],
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png',
    },
  },
  {
    tableName: 'User',
    timestamps: false,
  }
);

module.exports = { User };
