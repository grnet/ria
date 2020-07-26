const routes = require('express').Router()
let database = require('../services/database')
routes.get('/:entry_id', async (req,res,next) =>{
    
    let entry = await database.aitiologiki_ekthesi.findOne({where:{
        id: req.params.entry_id
    }})
    if(entry && entry.dataValues){
        res.render("form_a",{data:entry.dataValues})
    }else{
        res.status(404).send("Not found")
    }
});

module.exports = routes;
