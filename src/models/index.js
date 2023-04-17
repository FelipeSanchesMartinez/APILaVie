const Psicologos = require("./psicologos");
const Pacientes = require("./pacientes");
const Consultas = require("./consultas");

Pacientes.belongsToMany(Psicologos, {
  through: Consultas,
});

Psicologos.belongsToMany(Pacientes, {
  through: Consultas,
});

module.exports = {
  Psicologos,
  Pacientes,
  Consultas,
};
