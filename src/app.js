//IMPORT PACKAGES
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// IMPORT CREATE INITIAL USERS
import "./libs/initialSetup.js";

// IMPORT ROUTES
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

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
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('WORKING...')
})

// EXPORT MODULE
export default app;
