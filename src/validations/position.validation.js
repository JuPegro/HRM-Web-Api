import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const positionValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 50 characters long",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(10).max(70).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description must be at most 70 characters long",
    "any.required": "Description is required",
  }),
  departmentId: Joi.string().required().messages({
    "string.base": "DepartmentId must be a string",
    "string.empty": "DepartmentId is required",
    "any.required": "DepartmentId is required",
  }),
});
