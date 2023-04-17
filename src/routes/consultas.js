const express = require("express");
const consultaController = require("../controllers/consultasControllers");
const verifyToken = require("../middlewares/auth.js");

const routes = express.Router();

routes.get("/", verifyToken,consultaController.listarConsulta);
routes.get("/:id/", consultaController.listarConsultaId);
routes.post("/", verifyToken,consultaController.cadastraConsulta);
routes.delete("/:id/",verifyToken, consultaController.deletarConsulta);
routes.put("/:id/", verifyToken,consultaController.atualizarConsulta);

module.exports = routes;
