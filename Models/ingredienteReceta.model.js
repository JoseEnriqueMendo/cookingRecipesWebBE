const { DataTypes } = require('sequelize');
const { client_squalize } = require('../db/index');

const ingredientereceta = client_squalize.define(
  'ingredientereceta',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    medicion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    receta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingrediente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'ingredientereceta',
    timestamps: false,
  }
);

module.exports = { ingredientereceta };
