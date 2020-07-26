const routes = require('express').Router()

routes.get('/', function(req,res,next){
    res.render("dashboard")
});

module.exports = routes;
