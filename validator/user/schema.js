const Joi = require('joi');

const userCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).unknown();

const userUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
});

module.exports = {
    userCreateSchema,
    userUpdateSchema
};