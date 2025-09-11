import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "FIAP Substitutiva fase-2 API",
    version: "1.0.0",
    description: "API para gerenciamento de veículos e pagamentos",
    contact: {
      name: "Leonardo Ferreira",
      email: "leonardo10sp@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desenvolvimento",
    },
    {
      url: "http://192.168.49.2:30930",
      description: "🎯 Minikube NodePort",
    },
    {
      url: "http://localhost:3000",
      description: "💻 Local Development",
    },
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  // Importante: limitamos explicitamente aos arquivos de rotas válidos para evitar
  // capturar artefatos antigos em lib (ex.: payment.routes.js).
  apis: [
    "./src/infra/routes/vehicle.routes.ts",
    "./lib/infra/routes/vehicle.routes.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
