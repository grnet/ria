const routes = require('express').Router()
let database = require('../services/database')

routes.get('/', async (req,res,next) =>{
    let entries = await database.ekthesi.count()
    let user = await database.user.findOne({where:{
        username: req.session.username
    }})
    res.render("user_views/summaries",{entries:entries, user:user})
});

module.exports = routes;
