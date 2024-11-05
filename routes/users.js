const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/validation');
const { createUser, loginUser, getCurrentUser, removeCurrentuser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signupValidation, createUser);
router.post('/signin', loginValidation, loginUser);
router.post('/logout', removeCurrentuser);
router.get('/users/me', auth, getCurrentUser);

module.exports = router;