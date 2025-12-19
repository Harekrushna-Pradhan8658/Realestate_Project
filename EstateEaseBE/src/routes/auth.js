const express = require("express");
const User = require("../models/user");
const { validateSignUpData, validateEmail } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    validateEmail(req);

    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token);

    res.json({ message: "user added successfully ", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credential!!!!");
    }

    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
      throw new Error("No user found in database!!!");
    }
    // console.log(await bcrypt.hash(password, 10));
    const isPasswordValid = await user.validatePassword(password);
    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).send("Incorrect password!");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).send("user is not present");
  }
});

authRouter.post("/logout", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Please log in first!");
    
  }
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.send("You are successfully logged our!!!");
});

module.exports = authRouter;