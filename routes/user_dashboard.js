const routes = require('express').Router()

routes.get('/', async (req,res,next) =>{
    res.render("user_views/user_dashboard")
});

module.exports = routes;
