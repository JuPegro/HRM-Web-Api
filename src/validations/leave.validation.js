import Joi from "joi";

export const leaveValidation = Joi.object({
  employeeId: Joi.string().required().messages({
    "string.base": "Employee ID must be a string",
    "string.empty": "Employee ID is required",
    "any.required": "Employee ID is required",
  }),
  startDate: Joi.string().isoDate().required().messages({
    "string.base": "Start Date must be a string",
    "string.empty": "Start Date is required",
    "string.isoDate": "Start Date must be a valid ISO 8601 date",
    "any.required": "Start Date is required",
  }),
  endDate: Joi.string().isoDate().required().messages({
    "string.base": "End Date must be a string",
    "string.empty": "End Date is required",
    "string.isoDate": "End Date must be a valid ISO 8601 date",
    "any.required": "End Date is required",
  }),
  reason: Joi.string().required().messages({
    "string.base": "Reason must be a string",
    "string.empty": "Reason is required",
    "any.required": "Reason is required",
  }),
  status: Joi.string().valid("REJECTED", "APPROVED", "PENDING").messages({
    "string.base": "Status must be a string",
    "string.empty": "Status is required",
    "any.only":
      "Status must be one of 'REJECTED', 'APPROVED', 'PENDING'",
  }),
});

export const statusValidation = Joi.object({
  status: Joi.string().valid("REJECTED", "APPROVED", "PENDING").messages({
    "string.base": "Status must be a string",
    "string.empty": "Status is required",
    "any.only":
      "Status must be one of 'REJECTED', 'APPROVED', 'PENDING'",
  }),
});
