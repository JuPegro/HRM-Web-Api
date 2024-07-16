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
export const getDepartments = async (req, res, nex) => {
  try {
    const departments = await prisma.department.findMany();

    if (departments.length === 0)
      return res.status(404).json({ message: "Departments not found!" });

    return res.status(200).json({ departments: departments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE DEPARTMENT
export const getDepartmentById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const department = await prisma.department.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!department)
      return res.status(404).json({ message: "Department not found!" });

    return res.status(200).json({ department: department });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A DEPARTMENT
export const updateDepartment = async (req, res, nex) => {
  try {
    // GET DEPARTMENT ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // FIND DEPARTMENT
    const departmentExists = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });

    // IF NOT FOUND
    if (!departmentExists)
      return res.status(404).json({ message: "Department not found" });

    // VALIDATE BODY WITH JOI
    const { error, value } = departmentValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    /* THIS IS LOOKING FOR A DOCTOR WHO HAS THE SAME VALUE 
          INTRODUCED IN THE BODY FOR THE FIELDS */
    const uniqueFields = await prisma.department.findFirst({
      where: {
        NOT: { id: id }, // EXCLUDE CURRENT DEPARTMENT FROM SEARCH
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

    // UPDATE DEPARTMENT IN DATABASE
    const department = await prisma.department.update({
      where: {
        id: id,
      },
      data: value,
    });

    return res
      .status(200)
      .json({ message: "Updated department sucessfully", department });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A DEPARTMENT
export const deleteDepartment = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND DEPARTMENT
    const department = await prisma.department.findUnique({
      where: { id: id },
    });

    if (!department)
      return res.status(404).json({ message: "Department not found!" });

    // DELETE DEPARTMENT IN DATABASE
    await prisma.department.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Deleted department successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS DEPARTMENT
export const changeStatusDepartment = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // GET DATA DEPARTMENT
    const department = await prisma.department.findUnique({
      where: { id: id },
    });

    // IF NOT FOUND
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    // CHANGE STATUS WITH TERNARY
    const change = await prisma.department.update({
      where: { id: id },
      data: {
        status: department.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    return res
      .status(200)
      .json({ message: `Status change to ${change.status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
