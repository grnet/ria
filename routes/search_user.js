const routes = require('express').Router()
let database = require('../services/database')
routes.get('/', async (req,res,next) =>{
    let users = await database.ekthesi.findAll({where:{
        author_id: "1"
    }
    })
    //console.log(entries)
    res.render("user_views/search_user",{users:users})
});
//review
routes.post('/:user_id', async (req,res,next) =>{

    let users = await database.user.findAll({where:{
        
        [Op.or]: [{ fname: req.params.entry_id }, { lname: req.params.entry_id }, {username: req.params.entry_id}],
    }
    })
    if(users && users.dataValues){
        res.render("./search_user",{data:users.dataValues})
        console.log(users.dataValues)
    }else{
        res.status(404).send("Not found")
    }
});

module.exports = routes;