const { Client } = require("pg");
const dotenv = require("dotenv");
const fs = require("fs");
const { Sequelize } = require("sequelize");

dotenv.config();

const client_squalize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const authenticate = async () => {
  try {
    await client_squalize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

authenticate();
module.exports = { client_squalize };
