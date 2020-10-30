const routes = require('express').Router()
let database = require('../services/database')

routes.get('/', async function(req,res,next) {
    console.log( req.session.username)
    let user = await database.user.findOne({where:{
        username: req.session.username
    }, include: [{model: database.ekthesi}]
    })
    console.log( user)

    let entries = await database.ekthesi.findAll({
        include: [{model: database.user}]
    })
    console.log( entries)
    /*let user_entries = await database.ekthesi.findAll({where:{
        author: user.username
    }
    })*/
    
    res.render("user_views/history",{entries:entries, user:user})
});

module.exports = routes;
