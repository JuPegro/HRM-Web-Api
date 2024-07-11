import { PrismaClient } from "@prisma/client";
import { payrollValidation } from "../validations/payroll.validation.js";

const prisma = new PrismaClient();

// CREATE A NEW PAYROLL
export const createPayroll = async (req, res, nex) => {
  try {
    const { error, value } = payrollValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    // VALIDATE EMPLOYEE ID
    const employeeExist = await prisma.employee.findUnique({
      where: { id: value.employeeId },
    });

    // IF NOT FOUND
    if (!employeeExist)
      return res
        .status(404)
        .json({ message: "There are no registered users with that id" });

    const payroll = await prisma.payroll.create({
      data: {
        amount: employeeExist.salary,
        date: value.date,
        employeeId: value.employeeId,
      },
    });

    return res
      .status(201)
      .json({ message: "Created payroll successfully", payroll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL PAYROLL
export const getPayrolls = async (req, res, nex) => {
  try {
    const payrolls = await prisma.payroll.findMany();

    if (payrolls.length === 0)
      return res.status(404).json({ message: "Payrolls not found!" });

    return res.status(200).json({ payrolls: payrolls });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET A ONE PAYROLL
export const getPayrollById = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    const payroll = await prisma.payroll.findUnique({
      where: { id: id },
    });

    // CHECK USER FOUND
    if (!payroll)
      return res.status(404).json({ message: "Payroll not found!" });

    return res.status(200).json({ payroll: payroll });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A PAYROLL
export const updatePayroll = async (req, res, nex) => {
  try {
    // GET PAYROLL ID
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // VALIDATE BODY WITH JOI
    const { error, value } = payrollValidation.validate(req.body);

    // VALIDATE EMPTY FIELDS
    if (error) return res.status(400).json({ error: error.details[0].message });

    const employeeExist = await prisma.employee.findUnique({
      where: { id: value.employeeId },
    });

    // IF NOT FOUND
    if (!employeeExist)
      return res
        .status(404)
        .json({ message: "There are no registered users with that id" });

    // UPDATE PAYROLL IN DATABASE
    const payroll = await prisma.payroll.update({
      where: {
        id: id,
      },
      data: {
        amount: employeeExist.salary,
        date: value.date,
        employeeId: value.employeeId,
      },
    });

    return res
      .status(202)
      .json({ message: "Updated payroll sucessfully", payroll });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE A PAYROLL
export const deletePayroll = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK ID PROVIDED
    if (!id) return res.status(400).json({ message: "Id not provided!" });

    // FIND PAYROLL
    const payroll = await prisma.payroll.findUnique({
      where: { id: id },
    });

    if (!payroll)
      return res.status(404).json({ message: "Payroll not found!" });

    // DELETE PAYROLL IN DATABASE
    await prisma.payroll.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "Deleted payroll successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHANGE STATUS PAYROLL
export const changeStatusPayroll = async (req, res, nex) => {
  try {
    const { id } = req.params;

    // CHECK PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // GET DATA PAYROLL
    const payroll = await prisma.payroll.findUnique({ where: { id: id } });

    //IF NOT FOUND PAYROLL
    if (!payroll)
      return res.status(404).json({ message: "Payroll not found!" });

    // CHANGE STATUS WITH TERNARY
    const change = await prisma.payroll.update({
      where: { id: id },
      data: {
        status: payroll.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    return res
      .status(200)
      .json({ message: `Status change to ${change.status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
