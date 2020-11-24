const routes = require('express').Router()
const session = require('express-session');
let database = require('../services/database');
let fs = require('fs');

routes.get('/:entry_id', async (req,res,next) =>{
    
    let entry = await database.ekthesi.findOne({where:{
        id: req.params.entry_id
    }, include: [{model: database.rythmiseis}, {model: database.field_9}]
    })
    var myFile = fs.readFile("./" + entry.field_23_upload[0] , function (err,data){
        res.contentType("application/pdf");
        console.log(data)
    });
    //https://bezkoder.com/node-js-express-file-upload/
    //https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express?rq=1
    console.log("myFile: " + myFile)
    //res.sendFile("./" + entry.field_23_upload[0], { root : 'uploads'});
    
    //console.log(entry)
    if(entry && entry.dataValues){
        req.session.ekthesi_id = req.params.entry_id;
        res.render("form_a",{data:entry.dataValues, rolos:req.session.rolos, file:myFile});
    }else{
        res.status(404).send("Not found")
    }
    //console.log(req.sessionID)
});

routes.put('/:entry_id', async function(req,res,next){

    ekthesi_id = req.params.entry_id;
    console.log("req.body: "+ Object.keys(req.body) + Object.values(req.body));
    console.log("status: "+req.body.status_ekthesis);
    console.log("id: "+req.body.id);
    let ekthesi = await database.ekthesi.update(req.body, {where:{
        id: ekthesi_id
    }, include: [{model: database.rythmiseis}, {model: database.field_9}], returning: true, plain: true
    })
    //console.log(req.sessionID)

    //console.log(ekthesi.dataValues)
    if (!ekthesi){
        res.status(404).send("Error in updating ekthesi.");
    } else {  
        res.send({redirect: "./user_views/history"});
    }
});
module.exports = routes;