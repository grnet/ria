const routes = require("express").Router();
let database = require("../services/database");
const { body, check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

routes.get("/", async function (req, res, next) {
  const validation_errors = req.session.errors;
  delete req.session.errors;
  res.render("login", { errors: validation_errors });
});

routes.post(
  "/",
  [
    check("username").notEmpty().withMessage("Κενό όνομα χρήστη."),
    check("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage(
        "O κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες."
      )
      .notEmpty()
      .withMessage("Κενός κωδικός πρόσβασης."),
  ],

  async function (req, res, next) {
    const errors = validationResult(req);

    if (errors.errors.length === 0) {
      //no validation errors
      const inputPassword = req.body.password;
      let user = await database.user.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (user && user.dataValues) {
        bcrypt.compare(inputPassword, user.password, function (err, result) {
          if (result) {
            req.session.user = user;
            req.session.loginType = "app";
            res.status(200).send({ redirect: "user_views/dashboard" });
          } else {
            errors.errors.push({
              msg: "Δε βρέθηκε χρήστης με αυτό το όνομα ή κωδικό.",
            });
            res.status(404).send(errors.errors);
          }
        });
      } else {
        errors.errors.push({
          msg: "Δε βρέθηκε χρήστης με αυτό το όνομα ή κωδικό.",
        });
        res.status(404).send(errors.errors);
      }
    } else {
      res.status(400).send(errors.array());
    }
  }
);

module.exports = routes;
