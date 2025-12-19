const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validatateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const foundUser = req.user;
    res.send(foundUser);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validatateEditProfileData(req)) {
      return res.status(400).send("Invalid edit request!");
    }
    

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((val) => (loggedInUser[val] = req.body[val]));

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated succesfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error saving the user!" + err.message);
  }
});

module.exports = profileRouter;
