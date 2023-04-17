const express = require("express");
const pacienteController = require("../controllers/pacientesControllers");
const pacienteValidation = require("../validations/paciente/pacienteValidation");
const verifyToken = require("../middlewares/auth.js");
const routes = express.Router();

routes.get("/", verifyToken,pacienteController.listarPaciente);
routes.get("/:id/", verifyToken, pacienteController.listarPacienteId);
routes.post("/", verifyToken,pacienteValidation, pacienteController.cadastraPaciente);
routes.delete("/:id/", verifyToken,pacienteController.deletarPaciente);
routes.put("/:id/", verifyToken,pacienteValidation, pacienteController.atualizarPaciente);

module.exports = routes;
