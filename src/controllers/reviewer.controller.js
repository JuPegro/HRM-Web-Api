import { PrismaClient } from "@prisma/client";
import { reviewerValidation } from "../validations/reviewer.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW REVIEWER
export const createReviewer = async (req, res, nex) => {
  try {
    const { error, value } = reviewerValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // FIND EMPLOYEE WITH DEPARTMENT
    const employee = await prisma.employee.findUnique({
      where: {
        id: value.employeeId,
      },
      include: {
        position: true,
      },
    });

    // IF EMPLOYEE NOT FOUND
    if (!employee)
      return res.status(404).json({ message: "Employee not found!" });

    // CHECK UNIQUE FIELD ALREADY IN USE
    const isDepartmentOccupied = await prisma.reviewer.findUnique({
      where: {
        departmentId: employee.position.departmentId,
      },
    });

    // IF ALREADY IN USE
    if (isDepartmentOccupied)
      return res
        .status(400)
        .json({ message: "This department already has a reviewer" });

    const reviewer = await prisma.reviewer.create({
      data: {
        employeeId: employee.id,
        departmentId: employee.position.departmentId,
      },
    });

    return res
      .status(201)
      .json({ message: "Created reviewer successfully", reviewer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL REVIEWERS
export const getReviewers = async (req, res, nex) => {
  try {
    const reviewers = await prisma.reviewer.findMany();

    if (reviewers.length === 0)
      return res.status(404).json({ message: "Reviewers not found!" });

    return res.status(200).json({ reviewers: reviewers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE REVIEWER
export const getReviewerById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const reviewer = await prisma.reviewer.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!reviewer)
      return res.status(404).json({ message: "Reviewer not found!" });

    return res.status(200).json({ reviewer: reviewer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A REVIEWER
export const updateReviewer = async (req, res, nex) => {
  try {
    // GET REVIEWER ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // VALIDATE BODY WITH JOI
    const { error, value } = reviewerValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // FIND EMPLOYEE WITH DEPARTMENT INFO
    const employee = await prisma.employee.findFirst({
      where: {
        id: value.employeeId,
      },
      include: {
        position: true,
      },
    });

    // IF EMPLOYEE NOT FOUND
    if (!employee)
      return res.status(404).json({ message: "Employee not found!" });

    /* THIS IS LOOKING FOR A DOCTOR WHO HAS THE SAME VALUE 
        INTRODUCED IN THE BODY FOR THE FIELDS */
    const uniqueField = await prisma.reviewer.findUnique({
      where: {
        NOT: { id: id }, // EXCLUDE CURRENT REVIEWER FROM SEARCH
        departmentId: employee.position.departmentId,
      },
    });

    // IF UNIQUE FIELDS IN BODY
    if (uniqueField)
      return res
        .status(400)
        .json({ message: "This department already has a reviewer" });

    // UPDATE REVIEWER IN DATABASE
    const reviewer = await prisma.reviewer.update({
      where: {
        id: id,
      },
      data: {
        departmentId: employee.position.departmentId,
        employeeId: employee.id,
      },
    });

    return res
      .status(202)
      .json({ message: "Updated reviewer sucessfully", reviewer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A REVIEWER
export const deleteReviewer = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND REVIEWER
    const reviewer = await prisma.reviewer.findUnique({
      where: { id: id },
    });

    if (!reviewer)
      return res.status(404).json({ message: "Reviewer not found!" });

    // DELETE REVIEWER IN DATABASE
    await prisma.reviewer.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Deleted reviewer successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS REVIEWER
export const changeStatusReviewer = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // GET DATA REVIEWER
    const reviewer = await prisma.reviewer.findUnique({ where: { id: id } });

    // CHANGE STATUS WITH TERNARY
    const change = await prisma.reviewer.update({
      where: { id: id },
      data: {
        status: reviewer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    return res
      .status(200)
      .json({ message: `Status change to ${change.status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
