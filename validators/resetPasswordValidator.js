import Joi from "joi";

export const resetPasswordValidation = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),
  newPassword: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).+$"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, and a number",
    }),
});