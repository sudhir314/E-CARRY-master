const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          // FIXED: Using the secret key from Render environment variable
          const token = jwt.sign({ userID: user[0]._id }, process.env.JWT_SECRET);
          
          res.send({ 
            msg: "logged in successfully", 
            token: token,
            isAdmin: user[0].isAdmin || false, 
            name: user[0].name
          });
        } else {
          res.send({ msg: "incorrect password" });
        }
      });
    } else {
      res.send({ msg: "incorrect details provided" });
    }
  } catch (err) {
    res.send({ msg: "User is not registered" });
  }
});

UserRouter.post("/register", async (req, res) => {
  const { name, city, email, password } = req.body;
  const user = await UserModel.find({ email });
  try {
    if (user.length > 0) {
      res.send({ msg: "User is already registered, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went wrong" });
        } else {
          const user = UserModel({ 
            name, 
            email, 
            city, 
            password: hash, 
            isAdmin: false 
          });
          await user.save();
          res.send({ msg: "user registered" });
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  UserRouter,
};