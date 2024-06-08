import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Get Subscribers API",
      version: "1.0.0",
      description:
        "Documentation for the Get Subscribers API built with ExpressJS",
    },
    servers: [
      {
        url: "https://youtube-subscriber-eight.vercel.app/",
        description: "Deployment server",
      },
    ],
  },
  apis: ["./route/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
