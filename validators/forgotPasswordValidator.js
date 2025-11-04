import Joi from "joi";

export const forgotPasswordValidation = Joi.object({
  Email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
});