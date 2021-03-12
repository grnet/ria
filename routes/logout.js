const routes = require('express').Router()

routes.get('/', async function (req, res, next) {
    console.log(req.session)
    req.session.destroy()
    console.log(req.session)
    if (!req.session) {
        res.sendStatus(200);
    }
    //res.render("login");
});

module.exports = routes;
