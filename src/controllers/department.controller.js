import { PrismaClient } from "@prisma/client";
import { departmentValidation } from "../validations/department.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW DEPARTMENT
export const createDepartment = async (req, res, nex) => {
  try {
    // VALIDATE BODY WITH JOI
    const { error, value } = departmentValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // CHECK UNIQUE FIELDS ALREADY IN USE
    const uniqueFields = await prisma.department.findFirst({
      where: {
        OR: [{ name: value.name }, { code: value.code }],
      },
    });

    // IF UNIQUE FIELDS IN BODY
    if (uniqueFields) {
      if (uniqueFields.name === value.name)
        return res
          .status(400)
          .json({ message: "Department name already in use!" });
      if (uniqueFields.code === value.code)
        return res
          .status(400)
          .json({ message: "Department code already in use!" });
    }

    const department = await prisma.department.create({
      data: value,
    });

    return res
      .status(201)
      .json({ message: "Created department successfully", department });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL DEPARTMENT
export const getDepartments = async (req, res, nex) => {};

// GET A ONE DEPARTMENT
export const getDepartmentById = async (req, res, nex) => {};

// UPDATE A DEPARTMENT
export const updateDepartment = async (req, res, nex) => {};

// DELETE A DEPARTMENT
export const deleteDepartment = async (req, res, nex) => {};

// CHANGE STATUS DEPARTMENT
export const changeStatusDepartment = async (req, res, nex) => {};
