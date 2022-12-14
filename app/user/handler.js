const { user: User } = require('../../models');
const bcrypt = require('bcrypt');
const { validateUserCreateSchema, validateUserUpdateSchema } = require('../../validator/user');
const jwt = require('jsonwebtoken');

module.exports = {
    handlerGetUser: async (req, res) => {
        try {
            const user = await User.findAll();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ 
                error: error.message 
            });
        }
    },
    handlerCreateUser: async (req, res) => {
        try {
            validateUserCreateSchema(req, res, async () => {
                const { name, email, password } = req.body;
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    name,
                    email,
                    password: hashPassword
                });
                res.status(201).json(user);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    handlerUpdateUser: async (req, res) => {
        try {
            validateUserUpdateSchema(req, res, async () => {
                const { id } = req.params;
                const { name, email, password } = req.body;
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await User.update({
                    name,
                    email,
                    password: hashPassword
                }, {
                    where: { id }
                });
                res.status(200).json(user);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    handlerDeleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.destroy({
                where: { id }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    handlerLoginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: { 
                    email 
                }
            });
            if (!user) {
                return res.status(400).json({ 
                    error: 'User not found' 
                });
            } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ 
                    status: 'error',
                    error: 'Email or password is incorrect' 
                },
                    'rpb-secret-key',
                    { expiresIn: '1h' }   
                );
            } else {
                const accessToken = jwt.sign({ 
                    id: user.id,
                    email: user.email
                },
                    'rpb-secret-key',
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    status: 'success',
                    data: { user, accessToken}
                });
            }
        }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

