import { PrismaClient } from "@prisma/client";
import {
  licenseValidation,
  statusValidation,
} from "../validations/license.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW LICENSE
export const createLicense = async (req, res, nex) => {
  try {
    const { error, value } = licenseValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    const license = await prisma.license.create({
      data: value,
    });

    return res
      .status(201)
      .json({ message: "Created license successfully", license });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL LICENSE
export const getLicense = async (req, res, nex) => {
  try {
    const licenses = await prisma.license.findMany();

    if (licenses.length === 0)
      return res.status(404).json({ message: "Licenses not found!" });

    return res.status(200).json({ licenses: licenses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE LICENSE
export const getLicenseById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const license = await prisma.license.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!license)
      return res.status(404).json({ message: "License not found!" });

    return res.status(200).json({ license: license });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A LICENSE
export const updateLicense = async (req, res, nex) => {
  try {
    // GET LICENSE ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // VALIDATE BODY WITH JOI
    const { error, value } = licenseValidation.validate(req.body);

    // FOUND LICENSE EXISTS
    const findLicense = await prisma.license.findUnique({ where: { id: id } });

    // IF NOT FOUND LICENSE
    if (!findLicense)
      return res.status(404).json({ message: "License not found!" });

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // VERIFY VALID EMPLOYEEID
    const findEmployee = await prisma.employee.findUnique({
      where: { id: value.employeeId },
    });

    // IF NOT VALID EMPLOYEE ID
    if (!findEmployee)
      return res.status(404).json({ message: "This employee is invalid" });

    // UPDATE LICENSE IN DATABASE
    const license = await prisma.license.update({
      where: {
        id: id,
      },
      data: value,
    });

    return res
      .status(200)
      .json({ message: "Updated license sucessfully", license });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A LICENSE
export const deleteLicense = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND LICENSE
    const license = await prisma.license.findUnique({
      where: { id: id },
    });

    if (!license)
      return res.status(404).json({ message: "License not found!" });

    // DELETE LICENSE IN DATABASE
    await prisma.license.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Deleted license successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS LICENSE
export const changeStatusLicense = async (req, res, nex) => {
  try {
    const { id } = req.params;

    const { error, value } = statusValidation.validate(req.body);

    console.log(error);

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // EMPTY STATUS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // GET DATA LICENSE
    const license = await prisma.license.findUnique({ where: { id: id } });

    // IF NOT FOUND
    if (!license)
      return res.status(404).json({ message: "License not found!" });

    // CHANGE STATUS IN DATABASE
    const change = await prisma.license.update({
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
