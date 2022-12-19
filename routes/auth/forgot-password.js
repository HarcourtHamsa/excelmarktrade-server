var express = require("express");
const UsersDatabase = require("../../models/User");
const { hashPassword } = require("../../utils");
var router = express.Router();

router.put("/forgot-password", async function (req, res, next) {
  const { email } = req.body;

  const user = await UsersDatabase.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  // send email
});

router.put("/:email/reset-password", async function (req, res, next) {
  const { email } = req.params;
  const { password } = req.body;

  const user = await UsersDatabase.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  const hashedPassword = hashPassword(password);

  try {
    await user.updateOne({
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "update was successful",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
