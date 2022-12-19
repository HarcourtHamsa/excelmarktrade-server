const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const compareHashedPassword = (hashedPassword, password) => {
  const isSame = bcrypt.compareSync(password, hashedPassword);
  return isSame;
};

const sendDepositEmail = async ({ from, amount, method }) => {

  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `${process.env.EMAIL_USER}`, // sender address
    to: "Francisjay1000@gmail.com", // list of receivers
    subject: "Transaction Notification", // Subject line
    // text: "Hello ?", // plain text body
    html: `
    <html>
    <p>Hello Chief</p>

    <p>${from} said he/she just sent $${amount} worth of ${method}. Please confirm the transaction. 
    Also, don't forget to update his/her balance from your admin dashboard
    </p>

    <p>Best wishes,</p>
    <p>Excelmarktrade Team</p>

    </html>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};


module.exports = {
  hashPassword,
  compareHashedPassword,
  sendDepositEmail
};
