import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "FIAP Substitutiva fase - 4 CORE",
    version: "1.0.0",
    description: "API principal - (Cadastro, edição e exclusão de veículos)",
    contact: {
      name: "Leonardo Ferreira",
      email: "leonardo10sp@gmail.com",
    },
  },
  // servers: [
  //   {
  //     url: "http://localhost:3000",
  //     description: "Servidor de desenvolvimento",
  //   },
  //   {
  //     url: "http://192.168.49.2:30930",
  //     description: "🎯 Minikube NodePort",
  //   },
  //   {
  //     url: "http://localhost:3000",
  //     description: "💻 Local Development",
  //   },
  // ],
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
  apis: ["./src/infra/routes/*.ts", "./lib/infra/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
