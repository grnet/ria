const routes = require('express').Router()
let database = require("../services/database")
//des form_a.js kai dashboard.ejs gia to implementation
routes.get('/:user_id', function(req,res,next){
   //implement get users from model
    res.render("user_views/user_profile")
});

module.exports = routes;
