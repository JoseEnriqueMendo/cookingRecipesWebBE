const { DataTypes } = require("sequelize");
const { client_squalize } = require("../db/index");

const ingredientereceta = client_squalize.define(
  "ingredientereceta",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    priority: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
      references: {
        model: "receta",
        key: "id",
      },
    },
    ingrediente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "receta",
        key: "ingrediente",
      },
    },
  },
  {
    tableName: "ingredientereceta",
    timestamps: false,
  }
);

module.exports = { ingredientereceta };
