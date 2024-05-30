const { DataTypes } = require('sequelize');
const { client_squalize } = require('../db/index');

const recetasGuardadas = client_squalize.define(
  'recetasguardadasusuarios',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    receta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'receta',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    tableName: 'recetasguardadasusuarios',
    timestamps: false,
  }
);

module.exports = { recetasGuardadas };
