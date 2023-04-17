const { Consultas } = require("../models");
const { Pacientes } = require("../models");
const { Psicologos } = require("../models/index.js");

const dashboardController = {
  async numeroPacientes(req, res) {
    try {
      const numeroPacientes = await Pacientes.count();
      res.status(200).json({ numeroPacientes });
    } catch (error) {
      console.log("Não foi possível obter o número de pacientes", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async numeroAtendimentos(req, res) {
    try {
      const numeroAtendimentos = await Consultas.count();
      res.status(200).json({ numeroAtendimentos });
    } catch (error) {
      console.log("Não foi possível obter o número de atendimentos", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async numeroPsicologos(req, res) {
    try {
      const numeroPsicologos = await Psicologos.count();
      res.status(200).json({ numeroPsicologos });
    } catch (error) {
      console.log("Não foi possível obter o número de psicólogos", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async mediaAtendimentosPorPsicologo(req, res) {
    try {
      const mediaAtendimentosPorPsicologo = await Consultas.findAll({
        attributes: [
          "psicologo_id",
          [
            sequelize.fn("COUNT", sequelize.col("id")),
            "numeroAtendimentos",
          ],
        ],
        group: ["psicologo_id"],
      });

      const media =
        mediaAtendimentosPorPsicologo.length > 0
          ? mediaAtendimentosPorPsicologo.reduce(
              (total, item) =>
                total + item.dataValues.numeroAtendimentos,
              0
            ) / mediaAtendimentosPorPsicologo.length
          : 0;

      res.status(200).json({ mediaAtendimentosPorPsicologo: media });
    } catch (error) {
      console.log(
        "Não foi possível obter a média de atendimentos por psicólogo",
        error
      );
      res.status(500).json({ message: "Falha na operação" });
    }
  },
};

module.exports = dashboardController;
