const app = require("./app");
const db = require("./configs/database");

db.hasConection();

db.sincronizarTabelas();

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
