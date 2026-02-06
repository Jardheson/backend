const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Digital Store API",
      version: "1.0.0",
      description: "API documentation for Digital Store e-commerce platform",
      contact: {
        name: "Jardheson Oliveira",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
