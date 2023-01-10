const routes = require('express').Router()
const { authUser, authAdmin } = require('../middleware/auth');
let database = require('../services/database')
routes.get('/', authUser, authAdmin, async (req,res,next) =>{
    let users = await database.user.findAll()
    res.render("user_views/search_user",{users:users, user: req.session.user})
});

module.exports = routes;