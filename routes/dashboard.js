const routes = require('express').Router()
let database = require('../services/database')
routes.get('/', async (req,res,next) =>{
    let entries = await database.aitiologiki_ekthesi.findAll({where:{
        author_id: "1"
    }})
    console.log(entries)
    res.render("dashboard",{entries:entries})
});

module.exports = routes;
