import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyToken = async (req, res, next) => {
  // GET TOKEN FROM HEADERS
  let token = req.headers["x_access_token"];

  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    // VERIFY IS A REALLY TOKEN
    const decoded = jwt.verify(token, SECRET_TOKEN);
    req.id = decoded.id;

    // FOUND USER
    const user = await prisma.user.findUnique({
      where: {
        id: req.id,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // NEXT MIDDLEWARE
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // FOUND USER WITH REQ.ID OF VERIFYTOKEN
    const user = await prisma.user.findUnique({ where: { id: req.id } });

    if (user.role === "ADMIN") next();

    return res.status(403).json({ message: "Require Admin Role" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    // FOUND USER WITH REQ.ID OF VERIFYTOKEN
    const user = await prisma.user.findUnique({ where: { id: req.id } });

    if (user.role === "MODERATOR") next();

    return res.status(403).json({ message: "Require Moderator Role" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
