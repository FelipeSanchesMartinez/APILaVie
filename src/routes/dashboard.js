const express = require("express");
const dashboardControllers = require("../controllers/dashboardControllers");
const verifyToken = require("../middlewares/auth.js");

const routes = express.Router();

routes.get("/numero-pacientes",verifyToken, dashboardControllers.numeroPacientes);
routes.get("/numero-consultas",verifyToken, dashboardControllers.numeroAtendimentos);
routes.get("/numero-psicologos",verifyToken, dashboardControllers.numeroPsicologos);

module.exports = routes;
