const routes = require('express').Router();
const { authUser, authRole, authAgency } = require("../middleware/auth");
let database = require("../services/database");
const bcrypt = require('bcrypt');
const ministries = require("../lib/ministries");

routes.get(
  "/",
  authUser,
  authRole,
  authAgency,
  async function (req, res, next) {
    let user = await database.user.findOne({
      where: {
        taxId: req.session.user.taxId,
      },
    });
    if (user && user.dataValues) {
      const ministriesResult = await ministries.getMinistries();
      res.render("user_views/profile", {
        user: user.dataValues,
        ministries: ministriesResult,
      });
    } else {
      res.status(404).send("Not found");
    }
  }
);

routes.put(
  "/:taxId",
  authUser,
  authRole,
  authAgency,
  async function (req, res, next) {
    const password = req.body.password;
    const newPassword = req.body.new_password;
    const repeatPassword = req.body.password_repeat;

    req.session.errors = [];
    let user = await database.user.findOne({
      where: {
        taxId: req.body.taxId,
      },
    });
    const agency = req.body.other_agency
      ? req.body.other_agency
      : req.body.agency;
    if (user && user.dataValues) {
      if (!password) {
        console.log('EEEEEEEEEEEEEEEEEEE');
        //if password not provided update everything but the password
        await database.user
          .update(
            {
              fname: req.body.fname,
              lname: req.body.lname,
              username: req.body.username,
              taxId: req.body.taxId,
              role: req.body.role,
              isAdmin: req.body.isAdmin,
              agency: agency,
            },
            {
              where: {
                taxId: req.params.taxId,
              },
            }
          )
          .then(res.send({ redirect: "./dashboard" }));
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          //compare user passwords
          if (result) {
            if (newPassword === repeatPassword) {
              bcrypt.hash(newPassword, 10, async function (err, hash) {
                if (hash) {
                  await database.user.update(
                    {
                      fname: req.body.fname,
                      lname: req.body.lname,
                      taxId: req.body.taxId,
                      username: req.body.username,
                      password: hash,
                      role: req.body.role,
                      isAdmin: req.body.isAdmin,
                      agency: agency,
                    },
                    {
                      where: {
                        taxId: req.params.taxId,
                      },
                    }
                  );
                  console.log('DDDDDDDDDDDDDDDD');
                  res.send({ redirect: "./dashboard" });
                }
              });
            } else {
              console.log('CCCCCCCCCCCCCCC');
              req.session.errors.push({ msg: "Οι κωδικοί δεν ταιριάζουν." }); //custom error message
              const errors = req.session.errors;
              if (errors) {
                return res.status(422).json(errors);
              }
            }
          } else {
            console.log('BBBBBBBBBB');
            req.session.errors.push({
              msg: "Εισαγάγατε λάθος κωδικό πρόσβασης.",
            });
            res.send(req.session.errors);
          }
        });
      }
    } else {
      console.log('AAAAAAAAAAAAAAAAAAA');
      req.session.errors.push({ msg: "Εισαγάγατε λανθασμένα στοιχεία." });
      return res.send(req.session.errors);
    }
  }
);

module.exports = routes;
