// IMPORT CLIENT OF PRISMA
import { PrismaClient } from "@prisma/client";

// IMPORT ENCRYPTE PASSWORDS
import bcrypt from "bcryptjs";

// IMPORT SALT ROUNDS HASH PASSWORD
import { SALT_ROUNDS } from "../config.js";

// NEW PRISMA CLIENT
const prisma = new PrismaClient();


// DEFAULT USERS TO TEST
const usersToCreate = [
  {
    name: "SuperAdmin",
    lastname: "DefaultAdmin",
    email: "Admin@example.com",
    password: "Admin12345", 
    role: "ADMIN",
  },
  {
    name: "Moderator",
    lastname: "DefaultModerator",
    email: "Moderator@example.com",
    password: "Admin12345", 
    role: "MODERATOR",
  },
];

async function ensureUsersExist(req, res, next) {
  try {
    for (const defaultUser of usersToCreate) {
      const user = await prisma.user.findUnique({
        where: { email: defaultUser.email },
      });

      if (!user) {
        defaultUser.password = await bcrypt.hash(defaultUser.password, SALT_ROUNDS);
        await prisma.user.create({
          data: defaultUser,
        });
        console.log(`User ${defaultUser.email} created.`);
      } else {
        console.log(`User ${defaultUser.email} already exists.`);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default ensureUsersExist;
