import { PrismaClient } from "@prisma/client";
import { positionValidation } from "../validations/position.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW POSITION
export const createPosition = async (req, res, nex) => {
  try {
    const { error, value } = positionValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // CHECK UNIQUE FIELDS ALREADY IN USE
    const uniqueField = await prisma.position.findFirst({
      where: {
        name: value.name,
      },
    });

    // IF UNIQUE FIELDS IN BODY
    if (uniqueField)
      return res.status(400).json({ message: "Position name already in use!" });

    const position = await prisma.position.create({
      data: value,
    });

    return res
      .status(201)
      .json({ message: "Created position successfully", position });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL POSITIONS
export const getPositions = async (req, res, nex) => {
  try {
    const positions = await prisma.position.findMany();

    if (positions.length === 0)
      return res.status(404).json({ message: "Positions not found!" });

    return res.status(200).json({ positions: positions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE POSITION
export const getPositionById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const position = await prisma.position.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!position)
      return res.status(404).json({ message: "Position not found!" });

    return res.status(200).json({ position: position });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A POSITION
export const updatePosition = async (req, res, nex) => {};

// DELETE A POSITION
export const deletePosition = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND POSITION
    const position = await prisma.position.findUnique({
      where: { id: id },
    });

    if (!position)
      return res.status(404).json({ message: "Position not found!" });

    // DELETE POSITION IN DATABASE
    await prisma.position.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Deleted position successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS POSITION
export const changeStatusPosition = async (req, res, nex) => {};
