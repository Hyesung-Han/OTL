const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        info: {
            title: 'OTL API',
            version: '1.0.3',
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
        // host: 'localhost:3000',
        host: 'j6a405.p.ssafy.io',
        basePath: '/api'
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
