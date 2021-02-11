const routes = require('express').Router()
const { authUser } = require('../controllers/auth');
let database = require("../services/database")

routes.get('/', authUser,async (req,res,next) =>{
    let user = await database.user.findOne({where:{
        username: req.session.username
    }});
    if(user && user.dataValues){
        res.render("user_views/user_dashboard",{user:user.dataValues})
        //console.log(user.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

module.exports = routes;
