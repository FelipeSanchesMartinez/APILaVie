const { Psicologos } = require("../models/index.js");
const bcrypt = require("bcryptjs");

const psicologoController = {
  async listarPsicologo(req, res) {
    try {
      const listaPsicolgo = await Psicologos.findAll({
        exclude: ["senha"],
      });

      res
        .status(200)
        .json({ message: "Consulta realizada com sucesso", listaPsicolgo });
    } catch (error) {
      console.log("Não foi possivel localizar psicologos", error);
      res.status(500).json({ message: "falha na operação" });
    }
  },

  async listarPsicologoId(req, res) {
    try {
      const { id } = req.params;
      const psicologoID = await Psicologos.findByPk(id);
      if (psicologoID) {
        res
          .status(200)
          .json({ message: "Psicologo localizado com sucesso!", psicologoID });
      } else {
        res.status(404).json({ message: "Psicologo não encontrado" });
      }
    } catch (error) {
      console.log("Não foi possível buscar o psicologo", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },
  async cadastraPsicologo(req, res) {
    const { nome, email, senha, apresentacao } = req.body;

    if (!nome || !email || !senha || !apresentacao) {
      return res
        .status(400)
        .json({
          message: "Erro na requisição",
          data: "Todos os campos são obrigatórios",
        });
    }

    if (senha.length < 6) {
      return res
        .status(400)
        .json({ error: "A senha deve ter entre 6 e 25 caracteres." });
    }
    try {
      const newSenha = bcrypt.hashSync(senha, 8);

      const novoPsicologo = await Psicologos.create({
        nome,
        email,
        senha: newSenha,
        apresentacao,
      });
      res
        .status(201)
        .json({ message: "Psicologo cadastrado com sucesso!", novoPsicologo });
    } catch (error) {
      console.log("Não foi possível cadastrar o psicologo", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },

  async deletarPsicologo(req, res) {
    try {
      const { id } = req.params;
      const psicologo = await Psicologos.findOne({
        where: {
          id,
        },
      });

      if (!psicologo) {
        return res.status(404).json({ message: "Psicólogo não encontrado" });
      }

      await Psicologos.destroy({
        where: {
          id,
        },
      });

      return res.status(204).json();
    } catch (error) {
      console.log("Não foi possível deletar o psicólogo", error);
      return res.status(500).json({ message: "Falha na operação" });
    }
  },

  async atualizarPsicologo(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, apresentacao } = req.body;

      const psicologoExistente = await Psicologos.findOne({
        where: {
          id,
        },
      });

      if (!psicologoExistente) {
        return res.status(404).json({ message: "Psicólogo não cadastrado" });
      }

      const psicologoAtualizado = await Psicologos.update(
        {
          nome,
          email,
          senha,
          apresentacao,
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
          message: "Psicólogo atualizado com sucesso",
          psicologoAtualizado,
        });
    } catch (error) {
      console.log("Não foi possível atualizar o psicólogo", error);
      res.status(500).json({ message: "Falha na operação" });
    }
  },
};

module.exports = psicologoController;
