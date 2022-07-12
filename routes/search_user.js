const routes = require('express').Router()
const { authUser, authRole } = require('../middleware/auth');
let database = require('../services/database')
routes.get('/', authUser, authRole, async (req,res,next) =>{
    let users = await database.user.findAll()
    res.render("user_views/search_user",{users:users, user: req.session.user})
});

module.exports = routes;