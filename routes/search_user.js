const routes = require('express').Router()
let database = require('../services/database')
routes.get('/', async (req,res,next) =>{
    let users = await database.user.findAll()
    //console.log(users)
    res.render("user_views/search_user",{users:users})
});

module.exports = routes;