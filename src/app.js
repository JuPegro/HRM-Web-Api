//IMPORT PACKAGES
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// IMPORT SWAGGER CONFIG
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./libs/swagger.js";

// IMPORT CREATE INITIAL USERS
import "./libs/initialSetup.js";

// IMPORT ROUTES
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import positionRoutes from "./routes/position.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import licenseRoutes from "./routes/license.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import reviewerRoutes from "./routes/reviewer.routes.js";
import performanceRoutes from "./routes/performance.routes.js";

// CREATE SERVER
const app = express();

// SERVER READ JSON FILES
app.use(express.json());

// SERVER READ DATA FROM FORMS
app.use(express.urlencoded({ extended: true }));

// SET MORGAN
app.use(morgan("dev"));

// SET CORS
app.use(cors());

// SET MIDDLEWARE COOKIES
app.use(cookieParser());

// SEE ENVIROMENT VARIABLES
dotenv.config();

// SET ROUTES
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", positionRoutes);
app.use("/api", departmentRoutes);
app.use("/api", employeeRoutes);
app.use("/api", leaveRoutes);
app.use("/api", licenseRoutes);
app.use("/api", payrollRoutes);
app.use("/api", reviewerRoutes);
app.use("/api", performanceRoutes);

// SERVER SWAGGER DOCUMENTACION
app.use("/api-docs/v1", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("WORKING...");
});

// EXPORT MODULE
export default app;
