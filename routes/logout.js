const routes = require("express").Router();

routes.get("/", async function (req, res, next) {
  if (req.session.user && req.session.user.loginMethod === "app") {
    req.session.destroy();
    if (!req.session) {
      res.send({
        redirect: `/login`,
      });
    }
  } else {
    res.send({
      redirect: `${process.env.GSID_SITE}/oauth2server/logout/${process.env.CLIENT_ID}/?url=${process.env.SITE}`,
    });
  }
});

module.exports = routes;
