import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const employeeValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  lastname: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  salary: Joi.string().pattern(/^\d+(\.\d{2})$/).required().messages({
    "string.base": "Salary must be a string",
    "string.empty": "Salary is required",
    "string.pattern.base": "Salary must be in the format '38800.00'",
    "any.required": "Salary is required",
}),
  positionId: Joi.string().required().messages({
    "string.base": "positionId must be a string",
    "string.empty": "positionId is required",
    "any.required": "positionId is required",
  }),
});