import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const payrollValidation = Joi.object({
  employeeId: Joi.string().required().messages({
    "string.base": "employeeId must be a string",
    "string.empty": "employeeId is required",
    "any.required": "employeeId is required",
  }),
  date: Joi.string().isoDate().required().messages({
    "string.base": "Date must be a string",
    "string.empty": "Date is required",
    "string.isoDate": "Date must be a valid ISO 8601 date",
    "any.required": "Date is required",
  }),
});
