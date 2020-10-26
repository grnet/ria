const routes = require('express').Router()
let database = require('../services/database')

routes.get('/', async function(req,res,next){
    let logoutuser = await database.user.findOne({where:{
        isLoggedIn: true
    }})
    if(logoutuser) {
        console.log(logoutuser)
        logoutuser.update({isLoggedIn: false})
        console.log(logoutuser)
        
    }   
 
    res.render("login")
});

routes.post('/', async function(req,res,next){

    let user = await database.user.findOne({where:{
        username: req.body.username,
        password: req.body.password
    }})
    if(user && user.dataValues){
        user.update({isLoggedIn: true})
        console.log(user)
        if(user.dikaiwmata_diaxeirisis) {
            res.send({redirect: "user_views/admin_dashboard"});
        }
        else { 
            res.send({redirect: "user_views/user_dashboard"});
        }
    }else{
        res.status(404).send("Not found")
    }
});

/*this works. might be handy for put,delete. review later
routes.get('/1', function(req,res,next){
    res.render("create")
});*/

module.exports = routes;