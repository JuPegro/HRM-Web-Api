import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const reviewerValidation = Joi.object({
    employeeId: Joi.string().required().messages({
    "string.base": "employeeId must be a string",
    "string.empty": "employeeId is required",
    "any.required": "employeeId is required",
  })
});
