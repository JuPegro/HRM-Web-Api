import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const payrollValidation = Joi.object({
  amount: Joi.string()
    .pattern(/^\d+(\.\d{2})$/)
    .required()
    .messages({
      "string.base": "Salary must be a string",
      "string.empty": "Salary is required",
      "string.pattern.base": "Salary must be in the format '38800.00'",
      "any.required": "Salary is required",
    }),
  employeeId: Joi.string().required().messages({
    "string.base": "positionId must be a string",
    "string.empty": "positionId is required",
    "any.required": "positionId is required",
  }),
  date: Joi.string().isoDate().required().messages({
    "string.base": "Date must be a string",
    "string.empty": "Date is required",
    "string.isoDate": "Date must be a valid ISO 8601 date",
    "any.required": "Date is required",
  }),
});
