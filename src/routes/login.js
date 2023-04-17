const express = require("express");
const authController = require("../controllers/authControllers");
const authLoginValidation = require("../validations/auth/login");

const routes = express.Router();

routes.post("/", authLoginValidation, authController.login);

module.exports = routes;
