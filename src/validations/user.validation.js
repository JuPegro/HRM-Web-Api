import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const userValidation = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  lastname: Joi.string().min(3).max(20).required().messages({
    "string.base": "Lastname must be a string",
    "string.empty": "Lastname is required",
    "string.min": "Lastname must be at least 3 characters long",
    "string.max": "Lastname must be at most 20 characters long",
    "any.required": "Lastname is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8) // Longitud mínima de 8 caracteres
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  role: Joi.string(),
});
