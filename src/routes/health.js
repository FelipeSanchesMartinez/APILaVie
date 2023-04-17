const express = require("express");

const routes = express.Router();

routes.get("/", (req, ress) => {
  ress
    .status(200)
    .json({ message: "Operação bem sucedida", data: "API em funcionamento" });
});

module.exports = routes;
