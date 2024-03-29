const routes = require('express').Router()
const { authUser, authRole, authAgency } = require("../middleware/auth");
let database = require("../services/database")

routes.get("/", authUser, authRole, authAgency, async (req, res, next) => {
  let user = await database.user.findOne({
    where: {
      taxId: req.session.user.taxId,
    },
  });
  if (user && user.dataValues) {
    res.render("user_views/dashboard", { user: user.dataValues });
  } else {
    res.status(404).send("Not found");
  }
});

module.exports = routes;
