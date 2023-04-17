const { Psicologos } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

const authController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const psicologo = await Psicologos.findOne({
        where: {
          email,
        },
      });
      if (!psicologo) {
        return res.status(401).json({
          message: "Falha na operação",
          data: "E-mail ou senha inválido, verifique e tente novamente",
        });
      }
      const passwordIsValid = bcrypt.compareSync(senha, psicologo.senha);

      if (!passwordIsValid) {
        return res.status(401).json({
          message: "Falha na operação",
          data: "E-mail ou senha inválido, verifique e tente novamente",
        });
      }
      const token = jwt.sign(
        { id: psicologo.id, email: psicologo.email, nome: psicologo.nome },
        jwtSecret
      );
      return res.status(200).json({
        message: "Operação bem-sucedida",
        data: {
          token: token,
        },
      });
    } catch (error) {
      console.error("Erro na operação de login:", error);
      return res.status(500).json({ message: "Falha na operação", data: {} });
    }
  },
};

module.exports = authController;
