const routes = require("express").Router();
let database = require("../services/database");
const bcrypt = require("bcrypt");
const { body, check, validationResult } = require("express-validator");
const {
  authUser,
  authAdmin,
  authRole,
  authAgency,
} = require("../middleware/auth");
const ministries = require("../lib/ministries");

routes.get("/:taxId", authUser, authAdmin, async (req, res, next) => {
  console.log(req.params.taxId);
  let entry = await database.user.findOne({
    where: {
      taxId: req.params.taxId,
    },
  });
  if (entry && entry.dataValues) {
    const ministriesResult = await ministries.getMinistries();

    res.render("user_views/edit_user", {
      user: entry.dataValues,
      authUser: req.session.user,
      ministries: ministriesResult,
    }); // TODO: fix bug where user here is referenced in frontend as logged in user and not as to-be-edited user, which results in bugs with permissions
  } else {
    res.status(404).send("Not found");
  }
});

routes.delete(
  "/",
  authUser,
  authRole,
  authAgency,
  authAdmin,
  async (req, res, next) => {
    let user = await database.user.findOne({
      where: { taxId: req.body.taxId },
    });

    if (!user) {
      res.status(404).send("Error while deleting user");
    } else {
      user.destroy();
      res.send({ redirect: "../search_user" });
    }
  }
);

routes.put(
  "/",
  authUser,
  authRole,
  authAgency,
  authAdmin,
  async (req, res, next) => {
    const password = req.body.password;
    const newPassword = req.body.new_password;
    const repeatPassword = req.body.password_repeat;

    req.session.errors = [];
    let user = await database.user.findOne({
      where: {
        taxId: req.body.taxId,
      },
    });
    if (user && user.dataValues) {
      const agency = req.body.other_agency
        ? req.body.other_agency
        : req.body.agency;
      if (!password) {
        //if password not provided update everything but the password
        await database.user
          .update(
            {
              fname: req.body.fname,
              lname: req.body.lname,
              taxId: req.body.taxId,
              username: req.body.username,
              role: req.body.role,
              isAdmin: req.body.isAdmin,
              agency: agency,
            },
            {
              where: {
                taxId: req.body.taxId,
              },
            }
          )
          .then(res.send({ redirect: "../search_user" }));
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
                        taxId: req.body.taxId,
                      },
                    }
                  );
                  res.send({ redirect: "../search_user" });
                }
              });
            } else {
              req.session.errors.push({ msg: "Οι κωδικοί δεν ταιριάζουν." }); //custom error message
              const errors = req.session.errors;
              if (errors) {
                return res.status(422).json(errors);
              }
            }
          } else {
            req.session.errors.push({
              msg: "Εισαγάγατε λάθος κωδικό πρόσβασης.",
            });
            res.send(req.session.errors);
          }
        });
      }
    } else {
      req.session.errors.push({ msg: "Εισαγάγατε λανθασμένα στοιχεία." });
      return res.send(req.session.errors);
    }
  }
);

module.exports = routes;
