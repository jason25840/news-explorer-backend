const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/validation');
const { createUser, loginUser } = require('../controllers/users');

const router = express.Router();

// User signup route with validation
router.post('/signup', signupValidation, createUser);

// User login route with validation
router.post('/login', loginValidation, loginUser);

module.exports = router;