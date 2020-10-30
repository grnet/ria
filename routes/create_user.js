const routes = require('express').Router()
let database = require("../services/database")
routes.get('/', function(req,res,next){
    res.render("user_views/create_user")
});

routes.post('/', async function(req,res,next){
    
    //add row to user model, map values from req.body
    let res_data = await database.user.create(req.body)
    //console.log(req.body)  
    res.send(res_data)
    
});


module.exports = routes;
