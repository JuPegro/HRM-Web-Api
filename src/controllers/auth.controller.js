import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authValidation } from "../validations/auth.validation.js";
import { SECRET_TOKEN, SECURE_COOKIE } from "../config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signin = async (req, res, next) => {
  try {
    const { error, value } = authValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // FIND USER IN DB
    const userFound = await prisma.user.findUnique({ where: { email: value.email } });

    if (!userFound) return res.status(404).json({ message: "User not found" });

    // MATCH PASSWORD WITH ENCRYPT IN DB
    const matchPassword = await bcrypt.compare(value.password, userFound.password);

    if (!matchPassword)
      return res.status(401).json({ message: "Invalid password" });

    // CREATE USER AUTENTICATION TOKEN
    const token = jwt.sign({ id: userFound.id }, SECRET_TOKEN, {
      expiresIn: "1d",
    });

    // SET TOKEN IN COOKIE
    res.cookie("x_access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: SECURE_COOKIE === "production",
      maxAge: 1000 * 60 * 60, // ONE HOUR
    });

    // OMIT PASSWORD
    const { password: _, ...user } = userFound;

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
