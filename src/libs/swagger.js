import swaggerJSDoc from "swagger-jsdoc";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HRM Web Api",
    version: "1.0.0",
    description:
      "Human Resource Management System (HRM) is a backend application designed to manage employees, their positions, payroll, performance, leave and leave within an organization. The application is built with Node.js and uses Prisma ORM to interact with the database. This project provides a robust REST API that allows administrators to manage critical employee information efficiently.",
  },
};

const options = {
  swaggerDefinition,
  apis: [join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
