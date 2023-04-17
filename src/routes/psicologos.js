const express = require("express");
const psicologoController = require("../controllers/psicologosControllers");
const psicologoValidation = require("../validations/psicologo/psicologosValidations");
const verifyToken = require("../middlewares/auth.js");

const routes = express.Router();

routes.get("/", verifyToken,psicologoController.listarPsicologo);
routes.get("/:id/",verifyToken, psicologoController.listarPsicologoId);
routes.post("/",psicologoValidation, psicologoController.cadastraPsicologo);
routes.delete("/:id/", verifyToken,psicologoController.deletarPsicologo);
routes.put("/:id/",verifyToken,psicologoValidation,psicologoController.atualizarPsicologo);

module.exports = routes;
