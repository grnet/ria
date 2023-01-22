const routes = require('express').Router();
const { authUser } = require('../middleware/auth');
let database = require("../services/database");
const bcrypt = require('bcrypt');


routes.get('/', authUser, async function (req, res, next) {

    let user = await database.user.findOne({
      where: {
        taxId: req.session.user.taxId,
      },
    });
    if (user && user.dataValues) {
        let latest_entry = await database.ministries.max('id').catch((error) => { console.log(error) }); // get entry with highest id 
        let res_data = await database.ministries.findOne({ where: { id: latest_entry } }).catch((error) => { console.log(error) });
        let ministries = [];
        for (i in res_data.dataValues.ministries) {
            let value = res_data.dataValues.ministries[i].ministry;
            if (value && String(value).trim()) { ministries.push({ ministry: value }) }
        }
        res.render("user_views/profile", { user: user.dataValues, ministries: ministries })
    } else {
        res.status(404).send("Not found")
    }
});

routes.put("/:taxid", authUser, async function (req, res, next) {
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
            username: req.body.username,
            taxId: req.body.taxid,
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
                res.send({ redirect: "./dashboard" });
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
});

module.exports = routes;
