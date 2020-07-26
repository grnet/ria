const routes = require('express').Router()
let database = require("../services/database")
routes.get('/', function(req,res,next){
    res.render("create")
});

routes.post('/', async function(req,res,next){
    req.body.author_id="1";
    let res_data = await database.aitiologiki_ekthesi.create(req.body)
    res.send(res_data)

});


module.exports = routes;
