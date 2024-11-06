const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/validation");
const {
  createUser,
  loginUser,
  getCurrentUser,
  removeCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signupValidation, createUser);
router.post("/signin", loginValidation, loginUser);
router.post("/logout", auth, removeCurrentUser);
router.get("/users/me", auth, getCurrentUser);

module.exports = router;
