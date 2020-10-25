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
        console.log(entry.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

routes.put('/:entry_id', async function(req,res,next){
    console.log("Entered form a js")
    let ekthesi = await database.ekthesi.update( req.body,{where:{
        id: req.params.id
    }, returning: true, plain: true});
    
    if (!ekthesi){
        console.log("Error in updating ekthesi.");
        res.sendStatus.send(404);
    } else {
        res.sendStatus.send(200);
    }
});
module.exports = routes;