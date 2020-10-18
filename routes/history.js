const routes = require('express').Router()
let database = require('../services/database')

routes.get('/', async (req,res,next) =>{
    let entries = await database.ekthesi.findAll({where:{
        author_id: "1"
    }
    })
    //console.log(entries)
    res.render("user_views/history",{entries:entries})
});

module.exports = routes;
