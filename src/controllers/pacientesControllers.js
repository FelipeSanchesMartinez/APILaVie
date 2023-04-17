const { Pacientes } = require("../models");

const pacienteController = {
  async listarPaciente(req, res) {
    try {
      const listaPaciente = await Pacientes.findAll();

      res
        .status(200)
        .json({ message: "Consulta realizada com sucesso", listaPaciente });
    } catch (error) {
      console.log("Não foi possivel localizar pacientes", error);
      res.status(500).json({ message: "falha na operação" });
    }
  },

  async listarPacienteId(req, res) {
    try {
      const { id } = req.params;
      const pacienteID = await Pacientes.findByPk(id);
      if (pacienteID) {
        res
          .status(200)
          .json({ message: "Paciente localizado com sucesso!", pacienteID });
      } else {
        res.status(404).json({ message: "Paciente não encontrado" });
      }
    } catch (error) {
      console.log("Não foi possível buscar o paciente", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async cadastraPaciente(req, res) {
    try {
      const { nome, email, idade } = req.body;

      const novoPaciente = await Pacientes.create({
        nome,
        email,
        idade,
      });
      res
        .status(201)
        .json({ message: "Paciente cadastrado com sucesso!", novoPaciente });
    } catch (error) {
      console.log("Não foi possivel cadastrar o paciente", error);
      res.status(500).json({ message: "falha na operação" });
    }
  },

  async deletarPaciente(req, res) {
    try {
      const { id } = req.params;
      const paciente = await Pacientes.findOne({ where: { id } });
      if (!paciente) {
        return res.status(404).json({ message: "Id não encontrado" });
      }
      await Pacientes.destroy({ where: { id } });
      res.status(204).json("Paciente deletado com sucesso!");
    } catch (error) {
      console.log("Não foi possível deletar o paciente", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async atualizarPaciente(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, idade } = req.body;

      const pacienteExistente = await Pacientes.findOne({
        where: {
          id,
        },
      });

      if (!pacienteExistente) {
        return res.status(404).json({ message: "Paciente não cadastrado" });
      }

      const pacienteAtualizado = await Pacientes.update(
        {
          nome,
          email,
          idade,
        },
        {
          where: {
            id,
          },
        }
      );

      res
        .status(200)
        .json({
          message: "Paciente atualizado com sucesso",
          pacienteAtualizado,
        });
    } catch (error) {
      console.log("Não foi possível atualizar o paciente", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },
};

module.exports = pacienteController;
