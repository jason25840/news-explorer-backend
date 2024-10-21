const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/validation');
const { createUser, loginUser, getCurrentUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signupValidation, createUser);

router.post('/login', loginValidation, loginUser);

router.get('/users/me', auth, getCurrentUser);

module.exports = router;