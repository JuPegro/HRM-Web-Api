
# HRM WEB API

Human Resource Management System (HRM) is a backend application designed to manage employees, their positions, payroll, performance, leave and leave within an organization. The application is built with Node.js and uses Prisma ORM to interact with the database. This project provides a robust REST API that allows administrators to manage critical employee information efficiently.


[![NodeJS](https://img.shields.io/static/v1?label=NodeJS&message=v20.11.0&color=green)](https://nodejs.org/en/) [![Prisma](https://img.shields.io/static/v1?label=Prisma&message=v5.16.1&color=blue)](https://tailwindcss.com/) 
  [![Swagger](https://img.shields.io/static/v1?label=Swagger&message=v6.2.8&color=purple)](https://vitejs.dev/)
  [![Express](https://img.shields.io/static/v1?label=Express&message=v4.19.2&color=white)](https://nodejs.org/en/)
  [![License](https://img.shields.io/static/v1?label=License&message=MIT&color=orange)](LICENSE.md)

  [![My Skills](https://skillicons.dev/icons?i=nodejs,express,postgres,prisma)](https://skillicons.dev)


## Features

- **Employee Management:** CRUD of employees.
- **Position Management:** CRUD of positions.
- **Payroll Management:** CRUD of payroll records.
- **Performance Management:** CRUD performance evaluations.
- **Permissions Management:** CRUD of permissions.
- **License Management:** CRUD licenses.
- **Security:** Authentication and authorization, password hashing.
- **Automatic Initialization:** Automatic creation of users when starting the server.

## Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Swagger


## Installation

**Install project with npm**

```bash
  git clone https://github.com/JuPegro/HRM-Web-Api.git
  cd your-project
```

**Install dependencies**
```bash
  npm install
```

**Configure Environment Variables**

Create a file for environment variables `.env`

| Name             | Value               | Description                |
| :--------        | :-------            | :------------------------- |
| `PORT`           | `5000`              | `int` |
| `ADMIN_NAME`     | `John`              | `string`|
| `ADMIN_LASTNAME` | `Doe`               | `string` |
| `ADMIN_EMAIL`    | `admin@example.com` | `string` |
| `ADMIN_PASSWORD` | `Password!@2024`    | `string` |
| `ADMIN_ROLE`     | `ADMIN`             | `string` |
| `SECRET_TOKEN`   | `my-secret-token`   | `string` |
| `SECURE_COOKIE`  | `production-secure` | `string` |
| `DATABASE_URL` | `DATABASE_URL=postgresql://test:test@localhost:5432/test?schema=public` | `connection`|

**Migrate the Database**

```bash
npx prisma migrate dev
```
**Initialize Users and Start the Server:**

```bash
npm run dev
```

    
## License

[MIT](https://choosealicense.com/licenses/mit/)

**Free Software, Hell Yeah!**
