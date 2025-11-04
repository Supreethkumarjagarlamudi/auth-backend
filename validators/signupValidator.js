import Joi from 'joi';

export const signupValidation = Joi.object({
    FirstName: Joi.string().min(2).max(30).required().messages({
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name must be at most 30 characters"
    }),
    LastName: Joi.string().min(2).max(30).required().messages({
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name must be at most 30 characters",
    }),
    Email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email",
    }),
    Password: Joi.string().min(8).pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).+$")).required().messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, and a number",
    }),
});