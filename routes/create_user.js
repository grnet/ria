const routes = require("express").Router();
let database = require("../services/database");
const bcrypt = require("bcrypt");
const {
  authUser,
  authAdmin,
  authAgency,
  authRole,
} = require("../middleware/auth");
const ministries = require("../lib/ministries");

routes.get(
  "/",
  authUser,
  authRole,
  authAgency,
  authAdmin,
  async function (req, res, next) {
    const user = req.session.user;
    const ministriesResult = await ministries.getMinistries();
    res.render("user_views/create_user", {
      ministries: ministriesResult,
      user: user,
    });
  }
);

routes.post(
  "/",
  authUser,
  authRole,
  authAgency,
  authAdmin,
  async function (req, res, next) {
    const userPassword = req.body.password;
    const agency = req.body.other_agency
      ? req.body.other_agency
      : req.body.agency;
      console.log(req.body);
    if (userPassword) {
      bcrypt.hash(userPassword, 10, async function (err, hash) {
        //add row to user model, map values from req.body
        if (hash) {
          let res_data = await database.user.create({
            fname: req.body.fname,
            lname: req.body.lname,
            taxId: req.body.taxId,
            username: req.body.username,
            password: hash,
            role: req.body.role,
            isAdmin: req.body.isAdmin,
            agency: agency,
          });
          res.send(res_data);
        } else {
          console.log("error while hashing");
        }
      });
    } else {
      let res_data = await database.user.create({
        fname: req.body.fname,
        lname: req.body.lname,
        taxId: req.body.taxId,
        username: req.body.username,
        password: hash,
        role: req.body.role,
        isAdmin: req.body.isAdmin,
        agency: agency,
      });

      if (!res_data) {
        console.log("error while hashing");
      }
      res.send(res_data);
    }
  }
);

module.exports = routes;
