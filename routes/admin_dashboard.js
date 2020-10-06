const routes = require('express').Router()
let database = require('../services/database')

routes.get('/', async (req,res,next) =>{
    let entries = await database.ekthesi.findAll({where:{
        author_id: "1"
    }//,include: [{model: database.stoxoi_tomea_nomothetisis}]//,include: [{model: database.ekthesis_arthrwn_sintagmatos}]
    })
    console.log(entries)
    res.render("admin_dashboard",{entries:entries})
});

module.exports = routes;
