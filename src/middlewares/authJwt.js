import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x_access_token"];

  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, SECRET_TOKEN);
    req.id = decoded.id;

    const user = await prisma.user.findUnique({
      where: {
        id: req.id,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdmin = async (req, res, next) => {};
