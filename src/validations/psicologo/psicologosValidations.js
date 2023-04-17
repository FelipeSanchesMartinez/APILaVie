const { validate, Joi } = require("express-validation");
const _ = require("lodash");

module.exports = (req, res, next) => {
  const validationSchema = Joi.object({
    nome: Joi.string().required().messages({
      "any.required": "O campo nome é obrigatório",
      "string.empty": "O campo nome não pode ser vazio",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "O campo email deve ser um email válido",
      "any.required": "O campo email é obrigatório",
      "string.empty": "O campo email não pode ser vazio",
    }),
    senha: Joi.string().min(8).max(25).required().messages({
      "string.min": "O campo senha deve ter no mínimo {8} caracteres",
      "string.max": "O campo senha deve ter no máximo {25} caracteres",
      "any.required": "O campo senha é obrigatório",
      "string.empty": "O campo senha não pode ser vazio",
    }),
    apresentacao: Joi.string().max(250).required().messages({
      "string.max": "O campo apresentacao deve ter no máximo {250} caracteres",
      "any.required": "O campo apresentacao é obrigatório",
      "string.empty": "O campo apresentacao não pode ser vazio",
    }),
  });

  const validationResult = validationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validationResult.error) {
    const errors = validationResult.error.details.map((detail) => {
      return _.omit(detail, ["type", "context", "path"]);
    });

    return res.status(400).json({
      error:
        "Erro na validação dos dados digitados, verifique os campos e tente novamente",
      details: _.uniqWith(errors, _.isEqual), 
    });
  }

  return next();
};
