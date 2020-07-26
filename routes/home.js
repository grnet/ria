const routes = require('express').Router()

routes.get('/', function(req,res,next){
    res.render("home")
});

module.exports = routes;