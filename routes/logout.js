const routes = require("express").Router();

routes.get("/", async function (req, res, next) {
  console.log(req.session.loginType);
  if (req.session.loginType && req.session.loginType === "app") {
    req.session.destroy();
    if (!req.session) {
      res.send({
        redirect: "../login",
      });
    }
  } else {
    res.send({
      redirect: `https://test.gsis.gr/oauth2server/logout/${process.env.CLIENT_ID}/?url=${process.env.SITE}`,
    });
  }
});

module.exports = routes;
