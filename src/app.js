//IMPORT PACKAGES
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// IMPORT MIDDLEWARES
import ensureUsersExist from "./middlewares/ensureUsersExist.js";

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

// SEE ENVIROMENT VARIABLES
dotenv.config();

// USE MIDDLEWARES
app.use(ensureUsersExist);

app.get('/', (req, res) => {
    res.send('WORKING...')
})

// IMPORT ROUTES

// SET ROUTES

// EXPORT MODULE
export default app;
