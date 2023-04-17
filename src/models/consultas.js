const { Sequelize, DataTypes } = require("sequelize");
const db = require("../configs/database");
const Psicologos = require("./psicologos");
const Pacientes = require("./pacientes");

const Consultas = db.define(
  "Consultas",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    psicologo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Psicologos,
        key: "id",
      },
    },
    pacientes_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Pacientes,
        key: "id",
      },
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    observacao: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "consultas",
  }
);

module.exports = Consultas;
