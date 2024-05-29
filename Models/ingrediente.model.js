const { DataTypes } = require('sequelize');
const { client_squalize } = require('../db/index');

const ingrediente = client_squalize.define(
  'ingrediente',
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        'https://img.freepik.com/vector-gratis/dibujos-animados-ingredientes-desayuno-huevos-harina-jugo_24877-59984.jpg',
    },
  },
  {
    tableName: 'ingrediente',
    timestamps: false,
  }
);

module.exports = { ingrediente };
