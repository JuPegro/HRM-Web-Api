import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const departmentValidation = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  code: Joi.string()
    .length(8) // EXACT LENGHT OF 8 CHARACTERS
    .pattern(new RegExp("^[a-zA-Z]{2}0000[0-9]{2}$")) // TWO LETTER, FOUR ZERO, TWO NUMBERS
    .required()
    .messages({
      "string.base": "Code must be a string",
      "string.empty": "Code is required",
      "string.length": "Code must be exactly 8 characters long",
      "string.pattern.base":
        "Code must be in the format: two letters, four zeros, and two numbers",
      "any.required": "Code is required",
    }),
});
