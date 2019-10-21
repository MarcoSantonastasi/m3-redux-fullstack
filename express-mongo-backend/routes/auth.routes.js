const authController = require("express").Router();

const User = require("../models/user");

const bcrypt = require("bcrypt");
const bcryptSalt = 5;

authController.post("/signup", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const userName = req.body.username;
  const userPassword = req.body.password;

  User.findOne({ userName }, "username", (err, user) => {
    if (user !== null) {
      res.status(200).json({ errormessage: "this user already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const userPasswordEncrypted = bcrypt.hashSync(userPassword, salt);

    User.create(userPasswordEncrypted)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => console.log(err));
  }).catch(err => console.log(err));
});

module.exports = authController;
