const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { sequelize } = require("./models");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/v1", routes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco de dados sincronizado");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar banco de dados:", err);
  });

module.exports = app;
