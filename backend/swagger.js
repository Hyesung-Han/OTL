const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
        info: {
            title: 'OTL API',
            version: '1.0.0',
            description: 'OTL API with express',
        },
        securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
        },
        security: [
            { jwt: [] }
        ],
        servers: [
          {
            url: "https://j6a405.p.ssafy.io/api",
          },
          {
            url: "http://localhost:3000/api",
          },
        ],
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
