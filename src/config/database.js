require("dotenv").config();

const dialect = process.env.DB_DIALECT || "mysql";

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    storage: dialect === "sqlite" ? process.env.DB_STORAGE || "./dev.sqlite" : undefined,
    dialectOptions:
      process.env.DB_SSL === "true"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  },
  test: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || ":memory:",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 0,
    dialect: process.env.DB_DIALECT || "sqlite",
    storage:
      (process.env.DB_DIALECT || "sqlite") === "sqlite"
        ? process.env.DB_STORAGE || ":memory:"
        : undefined,
    dialectOptions:
      process.env.DB_DIALECT === "mysql" || process.env.DB_DIALECT === "postgres"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    storage: dialect === "sqlite" ? process.env.DB_STORAGE || "./prod.sqlite" : undefined,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
