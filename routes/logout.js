const routes = require("express").Router();

routes.get("/", async function (req, res, next) {
  req.session.destroy();
  if (!req.session) {
    res.sendStatus(200);
  }
});

module.exports = routes;
