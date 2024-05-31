const { DataTypes } = require("sequelize");
const { client_squalize } = require("../db/index");

const pasosreceta = client_squalize.define(
  "pasosreceta",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://img.freepik.com/vector-gratis/dibujos-animados-ingredientes-desayuno-huevos-harina-jugo_24877-59984.jpg",
    },
    receta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "pasosreceta",
    timestamps: false,
  }
);

module.exports = { pasosreceta };
