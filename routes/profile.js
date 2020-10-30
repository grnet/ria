const routes = require('express').Router()
let database = require("../services/database")
routes.get('/', async function (req,res,next) {
    
    let user = await database.user.findOne({where:{
        username: req.session.username
    }})
    if(user && user.dataValues){
        res.render("user_views/profile", {user:user.dataValues})
    }else{
        res.status(404).send("Not found")
    }
});

routes.put('/', async function(req,res,next) {
    console.log("params.username: " + req.session.username + " , body.username: " + req.body.username )
    let user = await database.user.update( req.body,{where:{
        username: req.session.username
    }, returning: true, plain: true});
    if (user){
        if (user.dikaiwmata_diaxeirisis) {
            req.session.username = req.boby.username;
            res.send({redirect: "./admin_dashboard"});
        } else {
            res.send({redirect: "./user_dashboard"});
        }  
    } else {
        console.log("Error in updating user.");
        res.sendStatus.send(404);   
    }
});

module.exports = routes;
