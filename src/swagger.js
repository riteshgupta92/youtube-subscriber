import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
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
    components: {
      schemas: {
        Subscriber: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the subscriber",
            },
            name: {
              type: "string",
              description: "The name of the subscriber",
            },
            subscribedChannel: {
              type: "string",
              description: "The channel to which the subscriber is subscribed",
            },
            subscribedDate: {
              type: "string",
              format: "date-time",
              description: "The date when the subscriber subscribed",
            },
          },
        },
        SubscriberNameAndChannel: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the subscriber",
            },
            subscribedChannel: {
              type: "string",
              description: "The channel to which the subscriber is subscribed",
            },
          },
        },
      },
    },
    paths: {
      "/subscribers": {
        get: {
          summary: "Get all subscribers",
          description: "Returns a list of all subscribers.",
          responses: {
            200: {
              description: "An array of subscribers.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Subscriber",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/subscribers/names": {
        get: {
          summary: "Get subscriber names and channels",
          description:
            "Retrieves names and subscribed channels of all subscribers without unique identifiers and subscription dates.",
          responses: {
            200: {
              description: "An array of subscriber names and channels.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/SubscriberNameAndChannel",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/subscribers/{id}": {
        get: {
          summary: "Get subscriber by ID",
          description:
            "Retrieves a single subscriber information by its unique identifier.",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              description: "Subscriber ID",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "The requested subscriber.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Subscriber",
                  },
                },
              },
            },
            404: {
              description: "Subscriber not found.",
            },
          },
        },
      },
    },
  },
  apis: ["./route/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
