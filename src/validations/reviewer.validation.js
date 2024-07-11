import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const employeeValidation = Joi.object({
    employeeId: Joi.string().required().messages({
    "string.base": "employeeId must be a string",
    "string.empty": "employeeId is required",
    "any.required": "employeeId is required",
  }),
  departmentId: Joi.string().required().messages({
    "string.base": "departmentId must be a string",
    "string.empty": "departmentId is required",
    "any.required": "departmentId is required",
  }),
});
