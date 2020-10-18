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
    
    let user = await database.user.findOne({where: {user_id: req.params.user_id}}).catch(e => {
        console.log(e.message)
     })
     console.log("FOUND USER" + user)
     if (!user){
       console.log("err");
     }
     return user.destroy();
     res.redirect('user_views/admin_dashboard');
   });


routes.put('/:username', async (req,res,next) =>{
    
    let user = await database.user.update( {fname: req.body.fname, lname: req.body.lname},{where:{
        user_id: req.params.user_id
    }, returning: true, plain: true})
    if(user && user.dataValues){
        res.render("user_views/edit_user",{data:user.dataValues})
        console.log(user.dataValues)
    }else{
        res.status(404).send("Not found")
    }

});

module.exports = routes;