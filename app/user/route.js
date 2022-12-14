const express = require('express');
const { handlerGetUser, handlerCreateUser, handlerUpdateUser, handlerDeleteUser, handlerLoginUser } = require('./handler');

const router = express.Router();

// API 1 - GET ALL USERS
router.get('/', handlerGetUser);

// API 2 - CREATE USER
router.post('/', handlerCreateUser);

// API 3 - UPDATE USER
router.put('/:id', handlerUpdateUser);

// API 4 - DELETE USER
router.delete('/:id', handlerDeleteUser);

// API 5 - LOGIN USER
router.post('/login', handlerLoginUser);


module.exports = router;