const routes = require('express').Router()
let database = require("../services/database")

routes.get('/', async (req,res,next) =>{
    let user = await database.user.findOne({where:{
        username: req.session.username
    }})
    if(user && user.dataValues){
        res.render("user_views/user_dashboard",{data:user.dataValues})
        console.log(user.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

module.exports = routes;
