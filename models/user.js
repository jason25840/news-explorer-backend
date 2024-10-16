const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Invalid email format'], // Email validation
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude password by default from query results
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  });

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);