const routes = require('express').Router()
let database = require("../services/database")

routes.get('/', function(req,res,next){
    res.render("create")
});

routes.post('/', async function(req,res,next){
    req.body.author_id="1";
    //add row to aitiologiki_ekthesi model, map values from req.body
    let res_data = await database.aitiologiki_ekthesi.create(req.body)
    console.log(req.body)
    //grouping each value of each row of table 18 
    var auksisi_esodwn = JSON.stringify([req.body.field_18_amesa_esoda_thesmoi, req.body.field_18_amesa_esoda_oikonomia, req.body.field_18_amesa_esoda_kinonia, req.body.field_18_amesa_esoda_perivallon, req.body.field_18_amesa_esoda_nisiwtika])
    var meiwsi_dapanwn = JSON.stringify([req.body.field_18_amesa_dapanes_thesmoi, req.body.field_18_amesa_dapanes_oikonomia, req.body.field_18_amesa_dapanes_kinonia, req.body.field_18_amesa_dapanes_perivallon, req.body.field_18_amesa_dapanes_nisiwtika])  
    var eksikonomisi_xronou = JSON.stringify([req.body.field_18_amesa_eksikonomisi_xronou_thesmoi, req.body.field_18_amesa_eksikonomisi_xronou_oikonomia, req.body.field_18_amesa_eksikonomisi_xronou_kinonia, req.body.field_18_amesa_eksikonomisi_xronou_perivallon, req.body.field_18_amesa_eksikonomisi_xronou_nisiwtika])
    var apodotikotita = JSON.stringify([req.body.field_18_amesa_apodotikotita_thesmoi, req.body.field_18_amesa_apodotikotita_oikonomia, req.body.field_18_amesa_apodotikotita_kinonia, req.body.field_18_amesa_apodotikotita_perivallon, req.body.field_18_amesa_apodotikotita_nisiwtika])
    var amesa_allo = JSON.stringify([req.body.field_18_amesa_allo_thesmoi, req.body.field_18_amesa_allo_oikonomia, req.body.field_18_amesa_allo_kinonia, req.body.field_18_amesa_allo_perivallon, req.body.field_18_amesa_allo_nisiwtika])
    var veltiwsi_ypiresiwn = JSON.stringify([req.body.field_18_emmesa_veltiosi_thesmoi, req.body.field_18_emmesa_veltiosi_oikonomia, req.body.field_18_emmesa_veltiosi_kinonia, req.body.field_18_emmesa_veltiosi_perivallon, req.body.field_18_emmesa_veltiosi_nisiwtika])
    var metaxirisi_politwn = JSON.stringify([req.body.field_18_emmesa_metaxirisi_thesmoi, req.body.field_18_emmesa_metaxirisi_oikonomia, req.body.field_18_emmesa_metaxirisi_kinonia, req.body.field_18_emmesa_metaxirisi_perivallon, req.body.field_18_emmesa_metaxirisi_nisiwtika])
    var diafania_thesmwn = JSON.stringify([req.body.field_18_emmesa_diafania_thesmoi, req.body.field_18_emmesa_diafania_oikonomia, req.body.field_18_emmesa_diafania_kinonia, req.body.field_18_emmesa_diafania_perivallon, req.body.field_18_emmesa_diafania_nisiwtika])
    var diaxirisi_kindynwn = JSON.stringify([req.body.field_18_emmesa_diaxirisi_kindinwn_thesmoi, req.body.field_18_emmesa_diaxirisi_kindinwn_oikonomia, req.body.field_18_emmesa_diaxirisi_kindinwn_kinonia, req.body.field_18_emmesa_diaxirisi_kindinwn_perivallon, req.body.field_18_emmesa_diaxirisi_kindinwn_nisiwtika])
    var emmesa_allo = JSON.stringify([req.body.field_18_emmesa_allo_thesmoi, req.body.field_18_emmesa_allo_oikonomia, req.body.field_18_emmesa_allo_kinonia, req.body.field_18_emmesa_allo_perivallon, req.body.field_18_emmesa_allo_nisiwtika])
    //map variables to model's fields
    database.ofeli_rythmisis.create({auksisi_esodwn: auksisi_esodwn, meiwsi_dapanwn: meiwsi_dapanwn, eksikonomisi_xronou: eksikonomisi_xronou, apodotikotita: apodotikotita, amesa_allo: amesa_allo,
        veltiwsi_ypiresiwn: veltiwsi_ypiresiwn, metaxirisi_politwn: metaxirisi_politwn, diafania_thesmwn: diafania_thesmwn, diaxirisi_kindynwn: diaxirisi_kindynwn, emmesa_allo: emmesa_allo})  
    res.send(res_data)
});

module.exports = routes;
