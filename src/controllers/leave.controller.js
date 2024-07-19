import { PrismaClient } from "@prisma/client";
import {
  leaveValidation,
  statusValidation,
} from "../validations/leave.validation.js";
import { empty } from "@prisma/client/runtime/library.js";

const prisma = new PrismaClient();

// CREATE A NEW LEAVE
export const createLeave = async (req, res, nex) => {
  try {
    const { error, value } = leaveValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    const leave = await prisma.leave.create({
      data: value,
    });

    return res
      .status(201)
      .json({ message: "Created leave successfully", leave });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL LEAVES
export const getLeaves = async (req, res, nex) => {
  try {
    const leaves = await prisma.leave.findMany();

    if (leaves.length === 0)
      return res.status(404).json({ message: "Leaves not found!" });

    return res.status(200).json({ leaves: leaves });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE LEAVE
export const getLeavesById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const leave = await prisma.leave.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!leave) return res.status(404).json({ message: "Leave not found!" });

    return res.status(200).json({ leave: leave });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A LEAVE
export const updateLeave = async (req, res, nex) => {
  try {
    // GET LEAVE ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // FOUND LEAVE EXISTS
    const findLeave = await prisma.leave.findUnique({ where: { id: id } });

    // IF NOT FOUND LEAVE
    if (!findLeave)
      return res.status(404).json({ message: "Leave not found!" });

    // VALIDATE BODY WITH JOI
    const { error, value } = leaveValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // VERIFY VALID EMPLOYEEID
    const findEmployee = await prisma.employee.findUnique({
      where: { id: value.employeeId },
    });

    // IF NOT VALID EMPLOYEE ID
    if (!findEmployee)
      return res.status(404).json({ message: "This employee is invalid" });

    // UPDATE LEAVE IN DATABASE
    const leave = await prisma.leave.update({
      where: {
        id: id,
      },
      data: value,
    });

    return res
      .status(200)
      .json({ message: "Updated leave sucessfully", leave });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A LEAVE
export const deleteLeave = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND LEAVE
    const leave = await prisma.leave.findUnique({
      where: { id: id },
    });

    if (!leave) return res.status(404).json({ message: "Leave not found!" });

    // DELETE LEAVE IN DATABASE
    await prisma.leave.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Deleted leave successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS LEAVE
export const changeStatusLeave = async (req, res, nex) => {
  try {
    const { id } = req.params;

    const { error, value } = statusValidation.validate(req.body);

    console.log(error);

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // EMPTY STATUS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // GET DATA LEAVE
    const leave = await prisma.leave.findUnique({ where: { id: id } });

    // IF NOT FOUND
    if (!leave) return res.status(404).json({ message: "Leave not found!" });

    // CHANGE STATUS IN DATABASE
    const change = await prisma.leave.update({
      where: { id: id },
      data: {
        status: value.status,
      },
    });

    return res
      .status(200)
      .json({ message: `Status change to ${change.status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
