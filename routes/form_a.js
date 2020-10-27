const routes = require('express').Router()
let database = require('../services/database')
routes.get('/:entry_id', async (req,res,next) =>{
    
    let entry = await database.ekthesi.findOne({where:{
        id: req.params.entry_id
    }, include: [{model: database.rythmiseis}, {model: database.field_9}]
    })
    //try this to check on ofeli_r let entry = await database.ekthesi.findAll({include: [{model: database.ofeli_rythmisis}]})
    if(entry && entry.dataValues){
        res.render("form_a",{data:entry.dataValues})
        req.session.ekthesi_id = req.params.entry_id
        //req.session.save()//optional
        console.log(req.session)
    }else{
        res.status(404).send("Not found")
    }
    console.log(req.sessionID)
});

routes.put('/:entry_id', async function(req,res,next){

    ekthesi_id = req.session.ekthesi_id
    console.log("ekthesi_id: " + ekthesi_id)
    let ekthesi = await database.ekthesi.update(req.body, {where:{
        id: ekthesi_id
    }, include: [{model: database.rythmiseis}, {model: database.field_9}], returning: true, plain: true
    })
    console.log(req.sessionID)

    //console.log(ekthesi.dataValues)
    if (!ekthesi){
        res.status(404).send("Error in updating ekthesi.")
    } else {  
        res.send({redirect: "./user_views/history"});
    }
});
module.exports = routes;