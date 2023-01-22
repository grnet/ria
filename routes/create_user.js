const routes = require("express").Router();
let database = require("../services/database");
const bcrypt = require("bcrypt");
const { authUser, authAdmin } = require("../middleware/auth");

routes.get("/", authUser, authAdmin, async function (req, res, next) {
  let latest_entry = await database.ministries.max("id").catch((error) => {
    console.log(error);
  }); // get entry with highest id
  const user = req.session.user;
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
  res.render("user_views/create_user", { ministries: ministries, user:user });
});

routes.post("/", authUser, authAdmin, async function (req, res, next) {
  const userPassword = req.body.password;
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
        agency: req.body.ypoyrgeio,
      });
      res.send(res_data);
    } else {
      console.log("error while hashing");
    }
  });
});

module.exports = routes;
