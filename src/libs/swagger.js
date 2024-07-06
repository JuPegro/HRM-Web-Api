import { join, dirname } from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HRM WEB - OpenAPI 3.0",
    version: "1.0.1",
    description:
      "Human Resource Management System (HRM) is a backend application designed to manage employees, their positions, payroll, performance, leave and leave within an organization. The application is built with Node.js and uses Prisma ORM to interact with the database. This project provides a robust REST API that allows administrators to manage critical employee information efficiently.",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      email: "jupegro.contact@gmail.com",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  externalDocs: {
    description: "Find out more about Swagger",
    url: "http://swagger.io",
  },
  servers: [
    {
      url: "http://localhost:5000"
    },
    {
      url: "http://localhost:5000/api-docs/v2"
    }
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
          },
          name: {
            type: "string",
            example: "Admin"
          },
          lastname: {
            type: "string",
            example: "Admin"
          },
          email: {
            type: "string",
            example: "Admin@example.com"
          },
          role: {
            type: "string",
            example: "ADMIN"
          },
          status: {
            type: "string",
            example: "ACTIVE"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z"
          }
        }
      },
      Department: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27"
          },
          name: {
            type: "string",
            example: "Information technology"
          },
          code: {
            type: "string",
            example: "TI00034"
          },
          status: {
            type: "string",
            example: "ACTIVE"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z"
          }
        }
      },
      SignInResponse: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/User"
          },
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMjIzYmExLTFiNzUtNDUyZS1hYTVjLWY0NWY2N2I3OWMyNyIsImlhdCI6MTcyMDE5MDY3MiwiZXhwIjoxNzIwMjc3MDcyfQ.f9QlUafw9lY2pqRLsgki4nAj7fN2cwf9O0m4zuTcESQ"
          }
        }
      }
    }
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;