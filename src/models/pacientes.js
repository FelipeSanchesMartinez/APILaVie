const { Sequelize } = require("sequelize");
const db = require("../configs/database");

const Pacientes = db.define(
  "Pacientes",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    idade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "pacientes",
  }
);

module.exports = Pacientes;
