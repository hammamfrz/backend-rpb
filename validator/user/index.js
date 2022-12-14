const { userCreateSchema, userUpdateSchema } = require('./schema');

function validateUserCreateSchema(req, res, next) {
    const { error } = userCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateUserUpdateSchema(req, res, next) {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateUserCreateSchema,
    validateUserUpdateSchema
};