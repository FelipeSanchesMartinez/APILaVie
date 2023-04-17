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
    idade: Joi.number().integer().min(0).messages({
      "number.integer": "O campo idade deve ser um número inteiro",
      "number.min": "O campo idade deve ser maior ou igual a 0",
      "any.empty": "O campo idade não pode ser vazio",
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
