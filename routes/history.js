const routes = require('express').Router()
let database = require('../services/database')

routes.get('/', async function(req,res,next) {
    console.log( req.session.username)
    let user = await database.user.findOne({where:{
        username: req.session.username
    }, include: [{model: database.ekthesi}]
    });
    //console.log( user);
    if (user && user.dataValues) {
            let per_role_entries = await database.user.findAll({where:{
                rolos: user.rolos
            }, include: [{model: database.ekthesi}]});
            let status_query = "Εκκρεμεί έκθεση Γενικού Λογιστηρίου του Κράτους"
            let status = await database.ekthesi.findAll({where:{
                status_ekthesis: status_query
            }, include: [{model: database.user}]
            });
            let entries = await database.ekthesi.findAll({
                include: [{model: database.user}]
            });
            //console.log("FOUND per_role_entries EKTHESIS: " + per_role_entries)
            res.render("user_views/history",{entries:entries, user:user, status:status, per_role_entries:per_role_entries})
    } else { 
        res.status(404).send("Not found")
    }

    //console.log( entries)
    /*let user_entries = await database.ekthesi.findAll({where:{
        author: user.username
    }
    })*/
    
    
});

module.exports = routes;
