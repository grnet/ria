const routes = require('express').Router()
let database = require('../services/database')
routes.get('/:entry_id', async (req,res,next) =>{
    
    let entry = await database.ekthesi.findOne({where:{
        id: req.params.entry_id
    }, include: [{model: database.ofeli_rythmisis}]
    })
    //try this to check on ofeli_r let entry = await database.ekthesi.findAll({include: [{model: database.ofeli_rythmisis}]})
    if(entry && entry.dataValues){
        res.render("form_a",{data:entry.dataValues})
        console.log(entry.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

module.exports = routes;