const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', routes);

// Sincronizar banco de dados (CUIDADO: force: true apaga dados)
// Em produção, use migrations. Aqui usamos sync para desenvolvimento rápido conforme solicitado.
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado');
}).catch((err) => {
  console.error('Erro ao sincronizar banco de dados:', err);
});

module.exports = app;
