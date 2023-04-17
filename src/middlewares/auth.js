const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function verifyToken(request, response, next) {
  try {
    const token = request.headers["x-access-token"];

    if (!token) {
      return response
        .status(403)
        .json({ message: "Falha na operação", data: "Nenhum token informado" });
    }

    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        return response.status(500).json({
          message: "Falha na operação",
          data: "Não foi possível autenticar o token enviado",
        });
      }

      request.id = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = verifyToken;
