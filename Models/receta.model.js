const { DataTypes } = require('sequelize');
const { client_squalize } = require('../db/index');

const RecetaModel = client_squalize.define(
  'receta',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(512),
      validate: {
        isUrl: {
          msg: 'El campo imagen debe ser una URL válida.',
        },
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    dificultad: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    time: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'El campo time debe ser un número de punto flotante.',
        },
        min: {
          args: [0],
          msg: 'El campo time debe ser mayor o igual a 0.',
        },
      },
    },
    porcion: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'El campo porcion debe ser un número de punto flotante.',
        },
        min: {
          args: [0],
          msg: 'El campo porcion debe ser mayor o igual a 0.',
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'receta', // Nombre de la tabla en la base de datos
    timestamps: false, // Desactiva createdAt y updatedAt si no existen en la tabla
  }
);

module.exports = { RecetaModel };
