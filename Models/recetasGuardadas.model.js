const { DataTypes } = require('sequelize');
const { client_squalize } = require('../db/index');

const recetasGuardadas = client_squalize.define(
  'RecetasGuardadasUsuarios',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    receta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'RecetasGuardadasUsuarios',
    timestamps: false,
  }
);

module.exports = { recetasGuardadas };
