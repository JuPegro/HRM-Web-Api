import Joi from "joi";

const leaveValidation = Joi.object({
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
  endDate: Joi.string()
    .isoDate()
    .greater(Joi.ref("startDate"))
    .required()
    .messages({
      "string.base": "End Date must be a string",
      "string.empty": "End Date is required",
      "string.isoDate": "End Date must be a valid ISO 8601 date",
      "string.greater": "End Date must be later than Start Date",
      "any.required": "End Date is required",
    }),
  reason: Joi.string().required().messages({
    "string.base": "Reason must be a string",
    "string.empty": "Reason is required",
    "any.required": "Reason is required",
  }),
});
