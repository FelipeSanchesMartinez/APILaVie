const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_CONFIG = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
};

let db = {};

try {
  db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
  console.error("Erro ao tentar uma conexão com banco de dados");
}

async function hasConection() {
  try {
    await db.authenticate();
    console.log("A conexão com banco de dados foi bem sucedida!");
  } catch (error) {
    console.error("Não foi se conectar com banco de dados:", error);
  }
}
async function sincronizarTabelas() {
  try {
    await db.sync();
    console.log("As tabelas foram sincronizadas com o banco de dados!");
  } catch (error) {
    console.error(
      "Erro ao sincronizar as tabelas com o banco de dados:",
      error
    );
    process.exit(1);
  }
}

Object.assign(db, {
  hasConection,
  sincronizarTabelas,
});

module.exports = db;
