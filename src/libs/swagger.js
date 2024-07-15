import { join, dirname } from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import { type } from "os";

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
      url: "http://localhost:5000",
    },
    {
      url: "http://localhost:5000/api-docs/v2",
    },
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
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          name: {
            type: "string",
            example: "Admin",
          },
          lastname: {
            type: "string",
            example: "Admin",
          },
          email: {
            type: "string",
            example: "Admin@example.com",
          },
          role: {
            type: "string",
            example: "ADMIN",
          },
          status: {
            type: "string",
            example: "ACTIVE",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      Department: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          name: {
            type: "string",
            example: "Information technology",
          },
          code: {
            type: "string",
            example: "TI00034",
          },
          status: {
            type: "string",
            example: "ACTIVE",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      Position: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          name: {
            type: "string",
            example: "Technical support",
          },
          description: {
            type: "string",
            example:
              "an advice service provided by a computer company, often by phone, for customers who have bought a product and are having problems using it.",
          },
          departmentId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          status: {
            type: "string",
            example: "ACTIVE",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      Employee: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          name: {
            type: "string",
            example: "John",
          },
          lastname: {
            type: "string",
            example: "Doe",
          },
          positionId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          salary: {
            type: "string",
            example: "108002.23",
          },
          status: {
            type: "string",
            example: "ACTIVE",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      Leave: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          employeeId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          startDate: {
            type: "string",
            example: "2024-07-10",
          },
          endDate: {
            type: "string",
            example: "2024-07-11",
          },
          reason: {
            type: "string",
            example: "vacation",
          },
          status: {
            type: "string",
            example: "ACTIVE",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      License: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          employeeId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          startDate: {
            type: "string",
            example: "2024-07-10",
          },
          endDate: {
            type: "string",
            example: "2024-07-11",
          },
          reason: {
            type: "string",
            example: "vacation",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      Payroll: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          employeeId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          date: {
            type: "string",
            example: "2024-07-10",
          },
          amount: {
            type: "string",
            example: "67890.00",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      Performance: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "b2223ba1-1b75-452e-aa5c-f45f67b79c27",
          },
          score: {
            type: "string",
            example: "CUATRO",
          },
          comments: {
            type: "string",
            example: "Very good",
          },
          employeeId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          reviewerId: {
            type: "string",
            example: "e97bfbe8-c334-495a-8edf-91d5cf47d5fe",
          },
          date: {
            type: "string",
            example: "2024-07-10",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2024-07-05T00:42:17.715Z",
          },
        },
      },
      SignInResponse: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/User",
          },
          token: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMjIzYmExLTFiNzUtNDUyZS1hYTVjLWY0NWY2N2I3OWMyNyIsImlhdCI6MTcyMDE5MDY3MiwiZXhwIjoxNzIwMjc3MDcyfQ.f9QlUafw9lY2pqRLsgki4nAj7fN2cwf9O0m4zuTcESQ",
          },
        },
      },
    },
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
