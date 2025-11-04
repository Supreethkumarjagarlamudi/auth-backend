import Joi from 'joi';

export const loginValidation = Joi.object({
    Email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email address",
    }),
    Password: Joi.string().required().messages({
        "string.empty": "Password is required",
    }),
});