import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE A NEW USER 
export const createUser = async (req, res, next) => {};

// UPDATE AN USER
export const updateUser = async (req, res, next) => {};

// DELETE AN USER
export const deleteUser = async (req, res, next) => {};

// GET ALL USER
export const getUsers = async (req, res, next) => {
    res.send('ESTA FUNCIONANDO MMGVASO')
};

// GET AN USER
export const getUserById = async (req, res, next) => {};

// CHANGE STATUS OF USER BY ID
export const changeStatusUser = async (req, res, next) => {};
