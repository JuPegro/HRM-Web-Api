// IMPORT CLIENT OF PRISMA
import { PrismaClient } from "@prisma/client";

// IMPORT ENCRYPTE PASSWORDS
import bcrypt from "bcryptjs";

// IMPORT ENVIROMENT VARIABLE
import {
  SALT_ROUNDS,
  ADMIN_EMAIL,
  ADMIN_LASTNAME,
  ADMIN_NAME,
  ADMIN_PASSWORD,
  ADMIN_ROLE,
} from "../config.js";

// NEW PRISMA CLIENT
const prisma = new PrismaClient();

export const createUsers = async () => {
  try {
    // FOUND DEFAULT ADMIN USER APP
    const user = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    // IF NOT FOUND 
    if (!user) {
      const encrypPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
      await prisma.user.create({
        data: {
          name: ADMIN_NAME,
          lastname: ADMIN_LASTNAME,
          email: ADMIN_EMAIL,
          password: encrypPassword,
          role: ADMIN_ROLE,
        },
      });
      console.log(`User ${ADMIN_ROLE} created.`);
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

createUsers();
