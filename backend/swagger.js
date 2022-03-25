const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
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
        host: 'localhost:3000',
        // host: 'i6a103.p.ssafy.io:3001',
        basePath: '/api'
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
