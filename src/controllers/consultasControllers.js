const { Consultas } = require("../models");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;



const consultaController = {
  async listarConsulta(req, res) {
    try {
      const listaConsulta = await Consultas.findAll();

      res
        .status(200)
        .json({ message: "Consulta realizada com sucesso", listaConsulta });
    } catch (error) {
      console.log("Não foi possivel localizar consulta", error);
      res.status(500).json({ message: "falha na operação" });
    }
  },

  async listarConsultaId(req, res) {
    try {
      const { id } = req.params;
      const consultaID = await Consultas.findByPk(id);

      if (consultaID) {
        res
          .status(200)
          .json({ message: "Consulta localizada com sucesso!", consultaID });
      } else {
        res.status(404).json({ message: "Id não encontrado" });
      }
    } catch (error) {
      console.log("Não foi possível buscar a consulta", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async cadastraConsulta(req, res) {
    try {
      const { pacientes_id, data, observacao } = req.body;
      if (!pacientes_id || !data || !observacao) {
        return res.status(400).json({
          message: "Erro na requisição",
          data: "Pacientes ID, data e observacao são obrigatórios",
        });
      }

      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, jwtSecret);
      const psicologo_id = decoded.id;

      const novoConsulta = await Consultas.create({
        psicologo_id,
        pacientes_id,
        data,
        observacao,
      });
      res
        .status(201)
        .json({ message: "Consulta cadastrada com sucesso!", novoConsulta });
    } catch (error) {
      console.log("Não foi possível cadastrar a consulta", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async deletarConsulta(req, res) {
    try {
      const { id } = req.params;

      const consulta = await Consultas.findOne({
        where: {
          id,
        },
      });

      if (!consulta) {
        return res.status(404).json({ message: "Consulta não encontrada" });
      }

      await Consultas.destroy({
        where: {
          id,
        },
      });

      res.status(204).json({ message: "Consulta deletada com sucesso!" });
    } catch (error) {
      console.log("Não foi possível deletar a consulta", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async atualizarConsulta(req, res) {
    try {
      const { id } = req.params;
      const { psicologo_id, pacientes_id, data, observacao } = req.body;

      const consulta = await Consultas.findOne({
        where: {
          id,
        },
      });

      if (!consulta) {
        return res.status(400).json({ message: "Consulta não encontrada" });
      }

      await Consultas.update(
        {
          psicologo_id,
          pacientes_id,
          data,
          observacao,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({ message: "Consulta atualizada com sucesso!" });
    } catch (error) {
      console.log("Não foi possível atualizar a consulta", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },
};

module.exports = consultaController;
