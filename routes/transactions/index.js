const UsersDatabase = require("../../models/User");
var express = require("express");
var router = express.Router();
const { sendDepositEmail } = require("../../utils");

router.post("/:_id/deposit", async (req, res) => {
  const { _id } = req.params;
  const { method, amount, from } = req.body;

  const user = await UsersDatabase.findOne({ _id });

  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    await user.updateOne({
      transactions: [
        ...user.transactions,
        {
          method,
          type: "Deposit",
          amount,
          from,
        },
      ],
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Deposit was successful",
    });

    // sendDepositEmail({
    //   amount: amount,
    //   method: method,
    //   from: from,
    //   url: url,
    // });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:_id/deposit/history", async (req, res) => {
  const { _id } = req.params;

  const user = await UsersDatabase.findOne({ _id });

  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    res.status(200).json({
      success: true,
      status: 200,
      data: [...user.transactions],
    });

    // sendDepositEmail({
    //   amount: amount,
    //   method: method,
    //   from: from,
    //   url: url,
    // });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:_id/withdrawals/history", async (req, res) => {
  console.log("Withdrawal request from: ", req.ip);

  const { _id } = req.params;

  const user = await UsersDatabase.findOne({ _id });

  if (!user) {
    res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });

    return;
  }

  try {
    res.status(200).json({
      success: true,
      status: 200,
      data: [...user.withdrawals],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
