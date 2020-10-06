const routes = require('express').Router()
let database = require("../services/database")
routes.get('/', function(req,res,next){
    console.log("USERS GET WORKS!")
    res.render("create")
});

routes.post('/', async function(req,res,next){
    
});


module.exports = routes;
