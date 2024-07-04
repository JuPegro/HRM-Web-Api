import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../config.js";
import { PrismaClient } from "@prisma/client";
import { userValidation } from "../validations/user.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW USER
export const createUser = async (req, res, next) => {
  try {
    // VALIDATE BODY WITH JOI
    const { error, value } = userValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // FOUND EMAIL ALREADY USE
    const foundEmail = await prisma.user.findUnique({
      where: { email: value.email },
    });

    // CHECK IF EMAIL IS ALREADY IN USE
    if (foundEmail)
      return res.status(400).json({ message: "Email is already use!" });

    // ENCRYPT PASSWORD
    const hashPassword = await bcrypt.hash(value.password, SALT_ROUNDS);

    // CREATE USER IN DATABASE
    const user = await prisma.user.create({
      data: {
        name: value.name,
        lastname: value.lastname,
        email: value.email,
        password: hashPassword,
      },
    });

    // OMIT PASSWORD IN RESPONSE
    const { password: _, ...publicUser } = user;

    // SUCCESSFULLY
    return res
      .status(200)
      .json({ message: "Created user successfully", publicUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE AN USER
export const updateUser = async (req, res, next) => {};

// DELETE AN USER
export const deleteUser = async (req, res, next) => {};

// GET ALL USER
export const getUsers = async (req, res, next) => {};

// GET AN USER
export const getUserById = async (req, res, next) => {};

// CHANGE STATUS OF USER BY ID
export const changeStatusUser = async (req, res, next) => {};
