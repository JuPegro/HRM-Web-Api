import { PrismaClient } from "@prisma/client";
import { employeeValidation } from "../validations/employee.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW EMPLOYEE
export const createEmployee = async (req, res, nex) => {
  try {
    // VALIDATE BODY WITH JOI
    const { error, value } = employeeValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // INSERT IN DATABASE
    const employee = await prisma.employee.create({
      data: value,
    });

    return res
      .status(201)
      .json({ message: "Created employee successfully", employee });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL EMPLOYEE
export const getEmployees = async (req, res, nex) => {
  try {
    const employees = await prisma.employee.findMany();

    if (employees.length === 0)
      return res.status(404).json({ message: "Employees not found!" });

    return res.status(200).json({ employees: employees });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE EMPLOYEE
export const getEmployeeById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const employee = await prisma.employee.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!employee)
      return res.status(404).json({ message: "Employee not found!" });

    return res.status(200).json({ employee: employee });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A EMPLOYEE
export const updateEmployee = async (req, res, nex) => {
  try {
    // GET EMPLOYEE ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // VALIDATE BODY WITH JOI
    const { error, value } = employeeValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // UPDATE EMPLOYEE IN DATABASE
    const employee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: value,
    });

    return res
      .status(202)
      .json({ message: "Updated employee sucessfully", employee });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A EMPLOYEE
export const deleteEmployee = async (req, res, nex) => {};

// CHANGE STATUS EMPLOYEE
export const changeStatusEmployee = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // GET DATA EMPLOYEE
    const employee = await prisma.employee.findUnique({
      where: { id: id },
    });

    // CHANGE STATUS WITH TERNARY
    const change = await prisma.employee.update({
      where: { id: id },
      data: {
        status: employee.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    return res
      .status(200)
      .json({ message: `Status change to ${change.status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
