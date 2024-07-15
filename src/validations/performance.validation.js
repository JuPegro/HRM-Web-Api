import Joi from "joi";

export const performanceValidation = Joi.object({
  score: Joi.string()
    .valid("CERO", "UNO", "DOS", "TRES", "CUATRO", "CINCO")
    .messages({
      "string.base": "Score must be a string",
      "string.empty": "Score is required",
      "any.only":
        "Score must be one of 'CERO', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO'",
    }),
    comments: Joi.string().required().messages({
    "string.base": "Comments must be a string",
    "string.empty": "Comments is required",
    "any.required": "Comments is required",
  }),
  date: Joi.string().isoDate().required().messages({
    "string.base": "Date must be a string",
    "string.empty": "Date is required",
    "string.isoDate": "Date must be a valid ISO 8601 date",
    "any.required": "Date is required",
  }),
  employeeId: Joi.string().required().messages({
    "string.base": "Employee ID must be a string",
    "string.empty": "Employee ID is required",
    "any.required": "Employee ID is required",
  }),
  reviewerId: Joi.string().required().messages({
    "string.base": "Reviewer ID must be a string",
    "string.empty": "Reviewer ID is required",
    "any.required": "Reviewer ID is required",
  }),
});
