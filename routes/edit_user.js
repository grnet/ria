const routes = require('express').Router()
let database = require('../services/database')
routes.get('/:username', async (req,res,next) =>{
    
    let user = await database.user.findOne({where:{
        username: req.params.username
    }})
    if(user && user.dataValues){
        res.render("user_views/edit_user",{data:user.dataValues})
        console.log(user.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

routes.delete('/:username', async (req,res,next) =>{
    
    let user = await database.user.findOne({where: {username: req.params.username}})
     
    if (!user){
        console.log("Error in deleting user.");
        res.sendStatus.send(400);
    } else {
        user.destroy();
        res.send({redirect: "../search_user"});
    }
   });


routes.put('/:username', async (req,res,next) =>{
    
    let user = await database.user.update( req.body,{where:{
        username: req.params.username
    }, returning: true, plain: true});
    if (!user){
        console.log("Error in updating user.");
        res.sendStatus.send(404);
    } else {
        res.send({redirect: "../search_user"});
    }
});

module.exports = routes;