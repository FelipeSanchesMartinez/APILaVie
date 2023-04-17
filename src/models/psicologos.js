const { DataTypes } = require("sequelize");
const db = require("../configs/database");

const Psicologos = db.define(
  "Psicologos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, Infinity],
          msg: "A senha deve ter entre 6 e 25 caracteres.",
        },
      },
    },
    apresentacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "psicologos",
  }
);

module.exports = Psicologos;
