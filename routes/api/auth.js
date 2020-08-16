const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const router = express.Router();

// Item Model
const User = require("../../models/User");
const { findById } = require("../../models/User");

// @route POST api/auth
// @desc Auth/Login An existing User
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }

  //Check for existing user
  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    //Validate Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get User Data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => {
      return res.status(401).json({ msg: "Not authorized" });
    });
});

module.exports = router;
