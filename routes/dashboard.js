const routes = require('express').Router()
const { authUser } = require('../middleware/auth');
let database = require("../services/database")

routes.get('/', authUser,async (req,res,next) =>{
    let user = await database.user.findOne({where:{
        username: req.session.username
    }});
    if(user && user.dataValues){
        res.render("user_views/dashboard",{user:user.dataValues})
    }else{
        res.status(404).send("Not found")
    }
});

module.exports = routes;
