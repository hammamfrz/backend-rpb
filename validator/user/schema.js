const Joi = require('joi');

const userCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/).required().messages({ 'string.pattern.base': 'Password harus mengandung huruf besar, huruf kecil, dan angka!' }),
}).unknown();

const userUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/).required().messages({ 'string.pattern.base': 'Password harus mengandung huruf besar, huruf kecil, dan angka!' }),
});

module.exports = {
    userCreateSchema,
    userUpdateSchema
};