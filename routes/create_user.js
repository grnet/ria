const routes = require('express').Router();
let database = require("../services/database");
const bcrypt = require('bcrypt');
const { authUser, authRole } = require('../middleware/auth');

routes.get('/', authUser, authRole, function(req,res,next){
    res.render("user_views/create_user");
});

routes.post('/', authUser, authRole, async function(req,res,next){
    const userPassword = req.body.password;
    bcrypt.hash(userPassword, 10, async function(err, hash) {
        //add row to user model, map values from req.body
        if (hash) {
            let res_data = await database.user.create({fname:req.body.fname, lname:req.body.lname, username:req.body.username, password:hash, rolos:req.body.rolos, dikaiwmata_diaxeirisis:req.body.dikaiwmata_diaxeirisis, ypoyrgeio:req.body.ypoyrgeio});
            //console.log(res_data);  
            res.send(res_data);        
        } else {
            console.log('error while hashing');
        }        
    })
    
});

module.exports = routes;
