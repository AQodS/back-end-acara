import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Acara",
    description: "Dokumentasi API Acara",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Server",
    },
    {
      url: "https://back-end-acara-flame.vercel.app/api",
      description: "Deploy Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "AQodS",
        password: "123456",
      },
      RegisterRequest: {
        fullName: "Boni Ngerkekek",
        username: "boni",
        email: "boni@yopmail.com",
        password: "Boni123",
        confirmPassword: "Boni123",
      },
      ActivationRequest: {
        code: "abcdef",
      },
    },
  },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
