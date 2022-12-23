var express = require("express");
const UsersDatabase = require("../models/User");
const { hashPassword } = require("../utils");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const users = await UsersDatabase.find();

  res.status(200).json({ code: "Ok", data: users });
});

/* GET users listing. */
router.get("/:email", async function (req, res, next) {
  const { email } = req.params;

  const user = await UsersDatabase.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  res.status(200).json({ code: "Ok", data: user });
});

router.put("/:_id/profile/update", async function (req, res, next) {
  const { _id } = req.params;
  const {firstName, lastName, email} = req.body;

  const user = await UsersDatabase.findOne({ _id: _id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  if (userInput.password) {
    const hashedPassword = hashPassword(userInput.password);
    userInput.password = hashedPassword;
  }

  try {
    await user.update({
      firstName,
      lastName,
      email
    });

    return res.status(200).json({
      message: "update was successful",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
