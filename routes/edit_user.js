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

routes.get("/:taxid", authUser, authAdmin, async (req, res, next) => {
  let entry = await database.user.findOne({
    where: {
      taxId: req.params.taxId,
    },
  });
  if (entry && entry.dataValues) {
    let latest_entry = await database.ministries.max("id").catch((error) => {
      console.log(error);
    }); // get entry with highest id
    let res_data = await database.ministries
      .findOne({ where: { id: latest_entry } })
      .catch((error) => {
        console.log(error);
      });
    let ministries = [];
    for (i in res_data.dataValues.ministries) {
      let value = res_data.dataValues.ministries[i].ministry;
      if (value && String(value).trim()) {
        ministries.push({ ministry: value });
      }
    }

    res.render("user_views/edit_user", {
      user: entry.dataValues,
      ministries: ministries,
    }); // TODO: fix bug where user here is referenced in frontend as logged in user and not as to-be-edited user, which results in bugs with permissions
  } else {
    res.status(404).send("Not found");
  }
});

routes.delete(
  "/:taxid",
  authUser,
  authRole,
  authAgency,
  authAdmin,
  async (req, res, next) => {
    let user = await database.user.findOne({
      where: { taxId: req.params.taxid },
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
  "/:taxid",
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
        taxId: req.params.taxid,
      },
    });
    if (user && user.dataValues) {
      if (!password) {
        //if password not provided update everything but the password
        await database.user
          .update(
            {
              fname: req.body.fname,
              lname: req.body.lname,
              taxId: req.body.taxid,
              username: req.body.username,
              role: req.body.role,
              isAdmin: req.body.isAdmin,
              agency: req.body.ypoyrgeio,
            },
            {
              where: {
                taxId: req.params.taxid,
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
                      taxId: req.body.taxid,
                      username: req.body.username,
                      password: hash,
                      role: req.body.role,
                      isAdmin: req.body.isAdmin,
                      agency: req.body.ypoyrgeio,
                    },
                    {
                      where: {
                        taxId: req.params.taxid,
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
