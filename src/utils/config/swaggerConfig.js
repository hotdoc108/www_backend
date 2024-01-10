import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HOTDOC WEB API',
    version: '1.0.0',
    description: 'Simple CRUD API with Swagger documentation',
  },
  servers: [{ url: 'http://localhost:3000' }],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/auth.js', './routes/client.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// module.exports = swaggerSpec;

export default swaggerSpec;
