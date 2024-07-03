import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN, SECURE_COOKIE } from "../config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Fields not provided" });

    // FOUND USER IN DB
    const userFound = await prisma.user.findUnique({ where: { email } });

    if (!userFound) return res.status(404).json({ message: "User not found" });

    // MATCH PASSWORD WITH ENCRYPT IN DB
    const matchPassword = await bcrypt.compare(password, userFound.password);

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

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
