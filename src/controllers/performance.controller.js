import { PrismaClient } from "@prisma/client";
import { performanceValidation } from "../validations/performance.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW PERFORMANCE
export const createPerformance = async (req, res, nex) => {
  try {
    const { error, value } = performanceValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // VERIFY THAT THE EMPLOYEE EXISTS
    const employee = await prisma.employee.findUnique({
      where: {
        id: value.employeeId,
      },
    });

    // IF NOT FOUND EMPLOYEE
    if (!employee)
      return res.status(404).json({ message: "Employee not found!" });

    // VERIFY THAT THE REVIEWER EXISTS
    const reviewer = await prisma.reviewer.findUnique({
      where: {
        id: value.reviewerId,
      },
    });

    // IF NOT FOUND REVIEWER
    if (!reviewer)
      return res.status(404).json({ message: "Reviewer not found!" });

    // CREATE PERFORMANCE IN DATABASE
    const performance = await prisma.performance.create({
      data: value,
    });

    return res
      .status(201)
      .json({ message: "Created performance successfully", performance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL PERFORMANCE
export const getPerformances = async (req, res, nex) => {
  try {
    const performances = await prisma.performance.findMany();

    if (performances.length === 0)
      return res.status(404).json({ message: "Performances not found!" });

    return res.status(200).json({ performances: performances });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE PERFORMANCE
export const getPerformanceById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const performance = await prisma.performance.findUnique({
      where: { id: id },
    });

    // CHECK PERFORMANCE FOUND
    if (!performance)
      return res.status(404).json({ message: "Performance not found!" });

    return res.status(200).json({ performance: performance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A PERFORMANCE
export const updatePeformance = async (req, res, nex) => {
  try {
    // GET PERFORMANCE ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // FOUND EXISTS PERFORMANCE
    const findPerformance = await prisma.performance.findUnique({
      where: { id: id },
    });

    // IF NOT FOUND PERFORMANCE
    if (!findPerformance)
      return res.status(404).json({ message: "Performance not found" });

    // VALIDATE BODY WITH JOI
    const { error, value } = performanceValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // FOUND EXISTS EMPLOYEE
    const findEmployee = await prisma.employee.findUnique({
      where: { id: value.employeeId },
    });

    // IF NOT FOUND EMPLOYEE
    if (!findEmployee)
      return res.status(404).json({ message: "Employee not found" });

    // FOUND EXISTS REVIEWER
    const findReviewer = await prisma.reviewer.findUnique({
      where: { id: value.reviewerId },
    });

    // IF NOT FOUND REVIEWER
    if (!findReviewer)
      return res.status(404).json({ message: "Reviewer not found" });

    // UPDATE PERFORMANCE IN DATABASE
    const performance = await prisma.performance.update({
      where: {
        id: id,
      },
      data: value,
    });

    return res
      .status(200)
      .json({ message: "Updated performance sucessfully", performance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A PERFORMANCE
export const deletePerformance = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND PERFORMANCE
    const performance = await prisma.performance.findUnique({
      where: { id: id },
    });

    if (!performance)
      return res.status(404).json({ message: "Performance not found!" });

    // DELETE PERFORMANCE IN DATABASE
    await prisma.performance.delete({
      where: { id: id },
    });

    return res
      .status(200)
      .json({ message: "Successfully deleted performance" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS PERFORMANCE
export const changeStatusPerformance = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // GET DATA PERFORMANCE
    const performance = await prisma.performance.findUnique({
      where: { id: id },
    });

    if(!performance) return res.status(404).json({message: "Performance not found"})

    // CHANGE STATUS WITH TERNARY
    const change = await prisma.performance.update({
      where: { id: id },
      data: {
        status: performance.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    return res
      .status(200)
      .json({ message: `Status change to ${change.status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
