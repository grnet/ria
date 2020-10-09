const routes = require('express').Router()
const { ekthesi } = require('../services/database');
let database = require("../services/database")

routes.get('/', function(req,res,next){
    res.render("create")
});


async function field18_row1(req) {

    //await database.ofeli_rythmisis.create(req.body)
}

routes.post('/', async function(req,res,next){
    req.body.author_id="1";
    

         //grouping each value of each row of table 18 
    var auksisi_esodwn = JSON.stringify([{"field_18_amesa_esoda_thesmoi": req.body.field_18_amesa_esoda_thesmoi}, {"field_18_amesa_esoda_oikonomia": req.body.field_18_amesa_esoda_oikonomia}, {"field_18_amesa_esoda_kinonia": req.body.field_18_amesa_esoda_kinonia}, {"field_18_amesa_esoda_perivallon": req.body.field_18_amesa_esoda_perivallon}, {"field_18_amesa_esoda_nisiwtika": req.body.field_18_amesa_esoda_nisiwtika}])
    var meiwsi_dapanwn = JSON.stringify([req.body.field_18_amesa_dapanes_thesmoi, req.body.field_18_amesa_dapanes_oikonomia, req.body.field_18_amesa_dapanes_kinonia, req.body.field_18_amesa_dapanes_perivallon, req.body.field_18_amesa_dapanes_nisiwtika])  
    var eksikonomisi_xronou = JSON.stringify([req.body.field_18_amesa_eksikonomisi_xronou_thesmoi, req.body.field_18_amesa_eksikonomisi_xronou_oikonomia, req.body.field_18_amesa_eksikonomisi_xronou_kinonia, req.body.field_18_amesa_eksikonomisi_xronou_perivallon, req.body.field_18_amesa_eksikonomisi_xronou_nisiwtika])
    var apodotikotita = JSON.stringify([req.body.field_18_amesa_apodotikotita_thesmoi, req.body.field_18_amesa_apodotikotita_oikonomia, req.body.field_18_amesa_apodotikotita_kinonia, req.body.field_18_amesa_apodotikotita_perivallon, req.body.field_18_amesa_apodotikotita_nisiwtika])
    var amesa_allo = JSON.stringify([req.body.field_18_amesa_allo_thesmoi, req.body.field_18_amesa_allo_oikonomia, req.body.field_18_amesa_allo_kinonia, req.body.field_18_amesa_allo_perivallon, req.body.field_18_amesa_allo_nisiwtika])
    var veltiwsi_ypiresiwn = JSON.stringify([req.body.field_18_emmesa_veltiosi_thesmoi, req.body.field_18_emmesa_veltiosi_oikonomia, req.body.field_18_emmesa_veltiosi_kinonia, req.body.field_18_emmesa_veltiosi_perivallon, req.body.field_18_emmesa_veltiosi_nisiwtika])
    var metaxirisi_politwn = JSON.stringify([req.body.field_18_emmesa_metaxirisi_thesmoi, req.body.field_18_emmesa_metaxirisi_oikonomia, req.body.field_18_emmesa_metaxirisi_kinonia, req.body.field_18_emmesa_metaxirisi_perivallon, req.body.field_18_emmesa_metaxirisi_nisiwtika])
    var diafania_thesmwn = JSON.stringify([req.body.field_18_emmesa_diafania_thesmoi, req.body.field_18_emmesa_diafania_oikonomia, req.body.field_18_emmesa_diafania_kinonia, req.body.field_18_emmesa_diafania_perivallon, req.body.field_18_emmesa_diafania_nisiwtika])
    var diaxirisi_kindynwn = JSON.stringify([req.body.field_18_emmesa_diaxirisi_kindinwn_thesmoi, req.body.field_18_emmesa_diaxirisi_kindinwn_oikonomia, req.body.field_18_emmesa_diaxirisi_kindinwn_kinonia, req.body.field_18_emmesa_diaxirisi_kindinwn_perivallon, req.body.field_18_emmesa_diaxirisi_kindinwn_nisiwtika])
    var emmesa_allo = JSON.stringify([req.body.field_18_emmesa_allo_thesmoi, req.body.field_18_emmesa_allo_oikonomia, req.body.field_18_emmesa_allo_kinonia, req.body.field_18_emmesa_allo_perivallon, req.body.field_18_emmesa_allo_nisiwtika])
    
    console.log("auksisi esodwn: " + auksisi_esodwn)
    console.log("meiwsi_dapanwn: " + meiwsi_dapanwn)
    console.log("eksikonomisi_xronou: " + eksikonomisi_xronou)
    console.log("apodotikotita: " + apodotikotita)
    console.log("amesa_allo: " + amesa_allo)
    console.log("veltiwsi_ypiresiwn: " + veltiwsi_ypiresiwn)
    console.log("metaxirisi_politwn: " + metaxirisi_politwn)
    console.log("diafania_thesmwn: " + diafania_thesmwn)
    console.log("diaxirisi_kindynwn: " + diaxirisi_kindynwn)
    console.log("emmesa_allo: " + emmesa_allo)
    //map variables to model's fields
    let res_data = await ekthesi.create(req.body)
                                        
    let ofeli_data = await database.ofeli_rythmisis.create({auksisi_esodwn: auksisi_esodwn, meiwsi_dapanwn: meiwsi_dapanwn, eksikonomisi_xronou: eksikonomisi_xronou, apodotikotita: apodotikotita, amesa_allo: amesa_allo,
        veltiwsi_ypiresiwn: veltiwsi_ypiresiwn, metaxirisi_politwn: metaxirisi_politwn, diafania_thesmwn: diafania_thesmwn, diaxirisi_kindynwn: diaxirisi_kindynwn, emmesa_allo: emmesa_allo, rythmisiId: res_data.id } )   
        console.log(ofeli_data)
    //add row to ekthesi model, map values from req.body
   
    //field18_row1(req)
    
    //console.log(req.body)  
    res.send(res_data)
});

module.exports = routes;
