const express = require("express");
const healthRoutes = require("./health");
const psicologosRoutes = require("./psicologos");
const pacientesRoutes = require("./pacientes");
const consultasRoutes = require("./consultas");
const loginRoutes = require("./login");
const dashboardRoutes = require("./dashboard")

const routes = express.Router();

routes.use("/health", healthRoutes);
routes.use("/psicologos", psicologosRoutes);
routes.use("/pacientes", pacientesRoutes);
routes.use("/consultas", consultasRoutes);
routes.use("/login", loginRoutes);
routes.use("/dashboard", dashboardRoutes);

module.exports = routes;





