const routes = require('express').Router()
let database = require('../services/database')
routes.get('/:user_id', async (req,res,next) =>{
    
    let user = await database.user.findOne({where:{
        user_id: req.params.user_id
    }})
    if(user && user.dataValues){
        res.render("user_views/edit_user",{data:user.dataValues})
        console.log(user.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

routes.delete('/:user_id', async (req,res,next) =>{
    
    let user = await database.user.destroy({where:{
        user_id: req.params.user_id
    }})

});

routes.put('/:user_id', async (req,res,next) =>{
    
    let user = await database.user.update( req.body,{where:{
        user_id: req.params.user_id
    }, returning: true, plain: true})

});

module.exports = routes;