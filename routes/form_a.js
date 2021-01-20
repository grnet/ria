const routes = require('express').Router()
let database = require('../services/database');
const fs = require('fs');
let pdf_export = require('../controllers/export');
const csv = require('csv-parser')
const { body, check, validationResult } = require('express-validator');
var multer = require('multer');
const { title } = require('process');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)//Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
    }
})

var upload = multer({ storage: storage }).fields([{ name: 'field_21_upload', maxCount: 10 }, { name: 'field_23_upload', maxCount: 10 }, { name: 'field_36_upload', maxCount: 10 }]);

routes.get('/:entry_id', async (req, res, next) => {

    // try {

    //     const results = [];

    //     var readCSV = fs.createReadStream('public/csvs/tooltips.csv')
    //         .pipe(csv())
    //         .on('data', (data) => results.push(data))
    //         .on('end', () => {
    //             console.log(results);
    //         });

    // } catch (err) {
    //     console.log('Csv error: ' + err)
    // }

    let entry = await database.ekthesi.findOne({
        where: {
            id: req.params.entry_id
        }//, include: [{ model: database.rythmiseis }, { model: database.field_9 }]
    })

    let rythmiseis = await database.rythmiseis.findOne({
        where: {
            rythmisiId: req.params.entry_id
        }
    })
    let field_9 = await database.field_9.findOne({
        where: {
            field9Id: req.params.entry_id
        }
    })
    pdf_name = entry.title + '.pdf';
    pdf_name = pdf_name.replace(/\s+/g, '');
    var pdf_exists;
    try {
        if (fs.existsSync('./public/pdf_exports/' + pdf_name)) {

            console.log("The file exists.");
            pdf_exists = true;
        } else {
            console.log("The file does not exist.");
            pdf_exists = false;
        }
    } catch (err) {
        console.log(err)
    }
    if (entry && entry.dataValues && field_9 && field_9.dataValues && rythmiseis && rythmiseis.dataValues) {
        req.session.ekthesi_id = req.params.entry_id;
        res.render("form_a", { data: entry.dataValues, staticTables:field_9.dataValues, checkboxTables:rythmiseis.dataValues, rolos: req.session.rolos, pdf_exists: pdf_exists });  
    } else {
        res.status(404).send("Not found")
    }
});


routes.post('/:entry_id', pdf_export.exportPDF) //router calls controller to handle the export


////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.put('/:entry_id', upload,
    // [check('title', 'Ο τίτλος είναι υποχρεωτικός.').notEmpty(),
    //  check('title').custom( async(value) => {
    //     var title = await database.ekthesi.count({ where: {title: value}})//count tables which have given title 
    //     console.log(title)
    //     if (title > 1) {//title already exists
    //         return Promise.reject('Υπάρχει ήδη ανάλυση με αυτόν τον τίτλο.');
    //     }
    // }),
    //  check('epispeudon_foreas', 'Ο επισπεύδων φορέας είναι υποχρεωτικός.').notEmpty(),

    // body('field_10_amesi_comments').if(body('field_10_amesi').notEmpty()).notEmpty().withMessage('Εάν είναι άμεση, εξηγήστε.'),
    // body('field_10_emmesi_comments').if(body('field_10_emmesi').notEmpty()).notEmpty().withMessage('Εάν είναι έμμεση, εξηγήστε.'),
    // body('field_11_comments')
    //     .if(body('field_10_emmesi').notEmpty())//if user checked field_10_amesi
    //     .if(body('field_10_amesi').notEmpty())//or if user checked field_10_emmesi
    //     .notEmpty().withMessage('Το πεδίο 11 είναι υποχρεωτικό.'),//field_11 must be filled in      
    // body('field_12_comments').if(body('field_10_emmesi').notEmpty()).if(body('field_10_amesi').notEmpty()).notEmpty().withMessage('Το πεδίο 12 είναι υποχρεωτικό.'),
    // body('field_13_comments').if(body('field_10_emmesi').notEmpty()).if(body('field_10_amesi').notEmpty()).notEmpty().withMessage('Το πεδίο 13 είναι υποχρεωτικό.'),

    // body('field_34').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 34 είναι υποχρεωτικό.'),
    // body('field_35').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 35 είναι υποχρεωτικό.'),
    // body('field_36').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 36 είναι υποχρεωτικό.'),
    // body('field_37').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 37 είναι υποχρεωτικό.'),
    // body('field_38').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 38 είναι υποχρεωτικό.'),
    // body('field_39').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 39 είναι υποχρεωτικό.'),
    // body('field_40').if(body('field_33').notEmpty()).notEmpty().withMessage('Το πεδίο 40 είναι υποχρεωτικό.'),
    // ],
    async function (req, res, next) {
        let ekthesi_id = req.params.entry_id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) { // if array exists
            console.log(errors);
            //return res.status(422).json(errors.array());
        } else {
            console.log('no errors');
            //next();

            try {
                //console.log("req.body: " + Object.keys(req.body) + Object.values(req.body));
                //console.log("status: " + req.body.status_ekthesis);
                //console.log("ekpedeusi_politismos: " + req.body.ekpedeusi_politismos);
                let ekthesi = await database.ekthesi.update(req.body, {
                    where: {
                        id: ekthesi_id
                    }
                });
                let field21 = [];
                let field23 = [];
                let field36 = [];
                try {

                    const file = req.files;
                    if (file.field_21_upload) {
                        for (i in file.field_21_upload) {
                            field21.push(file.field_21_upload[i].filename)
                        }
                        console.log("field21: " + field21);
                        // const error = new Error('Please upload a file')
                        // error.httpStatusCode = 400
                        // return next(error)

                    }
                    if (file.field_23_upload) {
                        for (i in file.field_23_upload) {
                            field23.push(file.field_23_upload[i].filename)
                            console.log(file.field_23_upload[i].path);
                        }
                        console.log("field23: " + field23);
                    }
                    if (file.field_36_upload) {
                        for (i in file.field_36_upload) {
                            field36.push(file.field_36_upload[i].filename)
                        }
                        console.log("field36: " + field36);
                    }
                } catch (e) {
                    console.log("Error message: " + e.message);
                }

                let prefix, elemValue;
                let row = [];
                let table = [];
                for (var elem in req.body) {
                    if (elem.includes('_label')) {
                        if (row.length) { 
                            console.log(row);
                            table.push({[prefix]:row});
                            row = [];
                        }
                        prefix = elem.split('_label');
                        prefix = prefix.slice(0, -1);
                    }
                    if (!elem.includes('_label') && !elem.includes('_header') && elem.includes(prefix)) {
                        elemValue = req.body[elem];
                        if (typeof elemValue != undefined){
                            row.push({[elem]:elemValue});
                        } else {
                            row.push('');
                        }                        
                    }                        
                }

                //findone where id:param.id [then] find common fields between table and record [then] update record{record[table[0]]:table[0]}
                console.log('updating f9...');
                console.log( await database.field_9.update( {table:{allos_deiktis1:table[0]}}, {
                    where: {
                        field9Id: ekthesi_id              
                    }
                })
                );

                //groupings for field9
                //ergasiakes_sxeseis_table
                
                //grouping each value of each row of table 18 
                let auksisi_esodwn =  [{ "field_18_amesa_esoda_thesmoi": req.body.field_18_amesa_esoda_thesmoi }, { "field_18_amesa_esoda_oikonomia": req.body.field_18_amesa_esoda_oikonomia }, { "field_18_amesa_esoda_kinonia": req.body.field_18_amesa_esoda_kinonia }, { "field_18_amesa_esoda_perivallon": req.body.field_18_amesa_esoda_perivallon }, { "field_18_amesa_esoda_nisiwtika": req.body.field_18_amesa_esoda_nisiwtika }] 
                let meiwsi_dapanwn =  [{ "field_18_amesa_dapanes_thesmoi": req.body.field_18_amesa_dapanes_thesmoi }, { "field_18_amesa_dapanes_oikonomia": req.body.field_18_amesa_dapanes_oikonomia }, { "field_18_amesa_dapanes_kinonia": req.body.field_18_amesa_dapanes_kinonia }, { "field_18_amesa_dapanes_perivallon": req.body.field_18_amesa_dapanes_perivallon }, { "field_18_amesa_dapanes_nisiwtika": req.body.field_18_amesa_dapanes_nisiwtika }] 
                let eksikonomisi_xronou =  [{ "field_18_amesa_eksikonomisi_xronou_thesmoi": req.body.field_18_amesa_eksikonomisi_xronou_thesmoi }, { "field_18_amesa_eksikonomisi_xronou_oikonomia": req.body.field_18_amesa_eksikonomisi_xronou_oikonomia }, { "field_18_amesa_eksikonomisi_xronou_kinonia": req.body.field_18_amesa_eksikonomisi_xronou_kinonia }, { "field_18_amesa_eksikonomisi_xronou_perivallon": req.body.field_18_amesa_eksikonomisi_xronou_perivallon }, { "field_18_amesa_eksikonomisi_xronou_nisiwtika": req.body.field_18_amesa_eksikonomisi_xronou_nisiwtika }] 
                let apodotikotita =  [{ "field_18_amesa_apodotikotita_thesmoi": req.body.field_18_amesa_apodotikotita_thesmoi }, { "field_18_amesa_apodotikotita_oikonomia": req.body.field_18_amesa_apodotikotita_oikonomia }, { "field_18_amesa_apodotikotita_kinonia": req.body.field_18_amesa_apodotikotita_kinonia }, { "field_18_amesa_apodotikotita_perivallon": req.body.field_18_amesa_apodotikotita_perivallon }, { "field_18_amesa_apodotikotita_nisiwtika": req.body.field_18_amesa_apodotikotita_nisiwtika }] 
                let amesa_allo =  [{ "field_18_amesa_allo_thesmoi": req.body.field_18_amesa_allo_thesmoi }, { "field_18_amesa_allo_oikonomia": req.body.field_18_amesa_allo_oikonomia }, { "field_18_amesa_allo_kinonia": req.body.field_18_amesa_allo_kinonia }, { "field_18_amesa_allo_perivallon": req.body.field_18_amesa_allo_perivallon }, { "field_18_amesa_allo_nisiwtika": req.body.field_18_amesa_allo_nisiwtika }] 
                let veltiwsi_ypiresiwn =  [{ "field_18_emmesa_veltiosi_thesmoi": req.body.field_18_emmesa_veltiosi_thesmoi }, { "field_18_emmesa_veltiosi_oikonomia": req.body.field_18_emmesa_veltiosi_oikonomia }, { "field_18_emmesa_veltiosi_kinonia": req.body.field_18_emmesa_veltiosi_kinonia }, { "field_18_emmesa_veltiosi_perivallon": req.body.field_18_emmesa_veltiosi_perivallon }, { "field_18_emmesa_veltiosi_nisiwtika": req.body.field_18_emmesa_veltiosi_nisiwtika }] 
                let metaxirisi_politwn =  [{ "field_18_emmesa_metaxirisi_thesmoi": req.body.field_18_emmesa_metaxirisi_thesmoi }, { "field_18_emmesa_metaxirisi_oikonomia": req.body.field_18_emmesa_metaxirisi_oikonomia }, { "field_18_emmesa_metaxirisi_kinonia": req.body.field_18_emmesa_metaxirisi_kinonia }, { "field_18_emmesa_metaxirisi_perivallon": req.body.field_18_emmesa_metaxirisi_perivallon }, { "field_18_emmesa_metaxirisi_nisiwtika": req.body.field_18_emmesa_metaxirisi_nisiwtika }] 
                let diafania_thesmwn =  [{ "field_18_emmesa_diafania_thesmoi": req.body.field_18_emmesa_diafania_thesmoi }, { "field_18_emmesa_diafania_oikonomia": req.body.field_18_emmesa_diafania_oikonomia }, { "field_18_emmesa_diafania_kinonia": req.body.field_18_emmesa_diafania_kinonia }, { "field_18_emmesa_diafania_perivallon": req.body.field_18_emmesa_diafania_perivallon }, { "field_18_emmesa_diafania_nisiwtika": req.body.field_18_emmesa_diafania_nisiwtika }] 
                let diaxirisi_kindynwn =  [{ "field_18_emmesa_diaxirisi_kindinwn_thesmoi": req.body.field_18_emmesa_diaxirisi_kindinwn_thesmoi }, { "field_18_emmesa_diaxirisi_kindinwn_oikonomia": req.body.field_18_emmesa_diaxirisi_kindinwn_oikonomia }, { "field_18_emmesa_diaxirisi_kindinwn_kinonia": req.body.field_18_emmesa_diaxirisi_kindinwn_kinonia }, { "field_18_emmesa_diaxirisi_kindinwn_perivallon": req.body.field_18_emmesa_diaxirisi_kindinwn_perivallon }, { "field_18_emmesa_diaxirisi_kindinwn_nisiwtika": req.body.field_18_emmesa_diaxirisi_kindinwn_nisiwtika }] 
                let emmesa_allo =  [{ "field_18_emmesa_allo_thesmoi": req.body.field_18_emmesa_allo_thesmoi }, { "field_18_emmesa_allo_oikonomia": req.body.field_18_emmesa_allo_oikonomia }, { "field_18_emmesa_allo_kinonia": req.body.field_18_emmesa_allo_kinonia }, { "field_18_emmesa_allo_perivallon": req.body.field_18_emmesa_allo_perivallon }, { "field_18_emmesa_allo_nisiwtika": req.body.field_18_emmesa_allo_nisiwtika }] 

                //grouping table 19 
                let proetimasia =  [{ "field_19_efarmogi_proetimasia_thesmoi": req.body.field_19_efarmogi_proetimasia_thesmoi }, { "field_19_efarmogi_proetimasia_oikonomia": req.body.field_19_efarmogi_proetimasia_oikonomia }, { "field_19_efarmogi_proetimasia_kinonia": req.body.field_19_efarmogi_proetimasia_kinonia }, { "field_19_efarmogi_proetimasia_perivallon": req.body.field_19_efarmogi_proetimasia_perivallon }, { "field_19_efarmogi_proetimasia_nisiwtika": req.body.field_19_efarmogi_proetimasia_nisiwtika }] 
                let ypodomi =  [{ "field_19_efarmogi_ypodomi_thesmoi": req.body.field_19_efarmogi_ypodomi_thesmoi }, { "field_19_efarmogi_ypodomi_oikonomia": req.body.field_19_efarmogi_ypodomi_oikonomia }, { "field_19_efarmogi_ypodomi_kinonia": req.body.field_19_efarmogi_ypodomi_kinonia }, { "field_19_efarmogi_ypodomi_perivallon": req.body.field_19_efarmogi_ypodomi_perivallon }, { "field_19_efarmogi_ypodomi_nisiwtika": req.body.field_19_efarmogi_ypodomi_nisiwtika }] 
                let kinitikotita =  [{ "field_19_efarmogi_kinitikotita_thesmoi": req.body.field_19_efarmogi_kinitikotita_thesmoi }, { "field_19_efarmogi_kinitikotita_oikonomia": req.body.field_19_efarmogi_kinitikotita_oikonomia }, { "field_19_efarmogi_kinitikotita_kinonia": req.body.field_19_efarmogi_kinitikotita_kinonia }, { "field_19_efarmogi_kinitikotita_perivallon": req.body.field_19_efarmogi_kinitikotita_perivallon }, { "field_19_efarmogi_kinitikotita_nisiwtika": req.body.field_19_efarmogi_kinitikotita_nisiwtika }] 
                let emplekomenoi =  [{ "field_19_efarmogi_emplekomenoi_thesmoi": req.body.field_19_efarmogi_emplekomenoi_thesmoi }, { "field_19_efarmogi_emplekomenoi_oikonomia": req.body.field_19_efarmogi_emplekomenoi_oikonomia }, { "field_19_efarmogi_emplekomenoi_kinonia": req.body.field_19_efarmogi_emplekomenoi_kinonia }, { "field_19_efarmogi_emplekomenoi_perivallon": req.body.field_19_efarmogi_emplekomenoi_perivallon }, { "field_19_efarmogi_emplekomenoi_nisiwtika": req.body.field_19_efarmogi_emplekomenoi_nisiwtika }] 
                let efarmogi_allo =  [{ "field_19_efarmogi_allo_thesmoi": req.body.field_19_efarmogi_allo_thesmoi }, { "field_19_efarmogi_allo_oikonomia": req.body.field_19_efarmogi_allo_oikonomia }, { "field_19_efarmogi_allo_kinonia": req.body.field_19_efarmogi_allo_kinonia }, { "field_19_efarmogi_allo_perivallon": req.body.field_19_efarmogi_allo_perivallon }, { "field_19_efarmogi_allo_nisiwtika": req.body.field_19_efarmogi_allo_nisiwtika }] 
                let apodosi_diaxirisis =  [{ "field_19_apodosi_diaxirisis_thesmoi": req.body.field_19_apodosi_diaxirisis_thesmoi }, { "field_19_apodosi_diaxirisis_oikonomia": req.body.field_19_apodosi_diaxirisis_oikonomia }, { "field_19_apodosi_diaxirisis_kinonia": req.body.field_19_apodosi_diaxirisis_kinonia }, { "field_19_apodosi_diaxirisis_perivallon": req.body.field_19_apodosi_diaxirisis_perivallon }, { "field_19_apodosi_diaxirisis_nisiwtika": req.body.field_19_apodosi_diaxirisis_nisiwtika }] 
                let ektelesi =  [{ "field_19_apodosi_ektelesi_thesmoi": req.body.field_19_apodosi_ektelesi_thesmoi }, { "field_19_apodosi_ektelesi_oikonomia": req.body.field_19_apodosi_ektelesi_oikonomia }, { "field_19_apodosi_ektelesi_kinonia": req.body.field_19_apodosi_ektelesi_kinonia }, { "field_19_apodosi_ektelesi_perivallon": req.body.field_19_apodosi_ektelesi_perivallon }, { "field_19_apodosi_ektelesi_nisiwtika": req.body.field_19_apodosi_ektelesi_nisiwtika }] 
                let apodosi_kostos =  [{ "field_19_apodosi_kostos_thesmoi": req.body.field_19_apodosi_kostos_thesmoi }, { "field_19_apodosi_kostos_oikonomia": req.body.field_19_apodosi_kostos_oikonomia }, { "field_19_apodosi_kostos_kinonia": req.body.field_19_apodosi_kostos_kinonia }, { "field_19_apodosi_kostos_perivallon": req.body.field_19_apodosi_kostos_perivallon }, { "field_19_apodosi_kostos_nisiwtika": req.body.field_19_apodosi_kostos_nisiwtika }] 
                let apodosi_allo =  [{ "field_19_apodosi_allo_thesmoi": req.body.field_19_apodosi_allo_thesmoi }, { "field_19_apodosi_allo_oikonomia": req.body.field_19_apodosi_allo_oikonomia }, { "field_19_apodosi_allo_kinonia": req.body.field_19_apodosi_allo_kinonia }, { "field_19_apodosi_allo_perivallon": req.body.field_19_apodosi_allo_perivallon }, { "field_19_apodosi_allo_nisiwtika": req.body.field_19_apodosi_allo_nisiwtika }] 

                //------------------------------------------------------------------------------//
                //add row to ekthesi model, map values from req.body & set foreign key equal to session username to get author 

                let req_body = req.body;//assign req.body to variable
                let keys = Object.keys(req_body);//get keys 
                let field_14_arthro = [];
                let field_14_stoxos = [];
                let field_17_onoma = [];
                let field_17_epitheto = [];
                let field_17_idiotita = [];
                let field_29_diatakseis_rythmisis = [];
                let field_29_yfistamenes_diatakseis = [];
                let field_30_diatakseis_katargisi = [];
                let field_30_katargoumenes_diatakseis = [];
                let field_31_sxetiki_diataksi = [];
                let field_31_synarmodia_ypoyrgeia = [];
                let field_31_antikeimeno_synarmodiotitas = [];
                let field_32_eksousiodotiki_diataksi = [];
                let field_32_eidos_praksis = [];
                let field_32_armodio_ypoyrgeio = [];
                let field_32_antikeimeno = [];
                let field_32_xronodiagramma = [];
                let value, key;
                for (i in keys) {//iterate through keys
                    // console.log(i + " " + keys[i])
                    if (keys[i].includes("field_14_arthro")) {
                        //console.log("FOUND ROW "+keys[i]);
                        value = req_body[keys[i]];//get value from pair
                        //console.log(" FOUND val "+value);
                        key = keys[i];//get key 
                        field_14_arthro.push({ key: value });
                    } else if (keys[i].includes("field_14_stoxos")) {
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_14_stoxos.push({ key: value });
                    } else if (keys[i].includes("field_17_onoma")) {
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_17_onoma.push({ key: value });
                    } else if (keys[i].includes("field_17_epitheto")) {
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_17_epitheto.push({ key: value });
                    } else if (keys[i].includes("field_17_idiotita")) {
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_17_idiotita.push({ key: value });
                    } else if (keys[i].includes("field_29_diatakseis_rythmisis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_29_diatakseis_rythmisis.push({ key: value });
                    } else if (keys[i].includes("field_29_yfistamenes_diatakseis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_29_yfistamenes_diatakseis.push({ key: value });
                    } else if (keys[i].includes("field_30_diatakseis_katargisi")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_30_diatakseis_katargisi.push({ key: value });
                    } else if (keys[i].includes("field_30_katargoumenes_diatakseis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_30_katargoumenes_diatakseis.push({ key: value });
                    } else if (keys[i].includes("field_31_sxetiki_diataksi")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_31_sxetiki_diataksi.push({ key: value });
                    } else if (keys[i].includes("field_31_synarmodia_ypoyrgeia")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_31_synarmodia_ypoyrgeia.push({ key: value });
                    } else if (keys[i].includes("field_31_antikeimeno_synarmodiotitas")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_31_antikeimeno_synarmodiotitas.push({ key: value });
                    } else if (keys[i].includes("field_32_eksousiodotiki_diataksi")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_32_eksousiodotiki_diataksi.push({ key: value });
                    } else if (keys[i].includes("field_32_eidos_praksis")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_32_eidos_praksis.push({ key: value });
                    } else if (keys[i].includes("field_32_armodio_ypoyrgeio")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_32_armodio_ypoyrgeio.push({ key: value });
                    } else if (keys[i].includes("field_32_antikeimeno")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_32_antikeimeno.push({ key: value });
                    } else if (keys[i].includes("field_32_xronodiagramma")) {
                        console.log("FOUND ROW " + keys[i]);
                        value = req_body[keys[i]];
                        key = keys[i];
                        field_32_xronodiagramma.push({ key: value });
                    }
                }
                //console.log("field_29_diatakseis_rythmisis: " + field_29_diatakseis_rythmisis);
                var author = req.session.username;
                await database.ekthesi.update({
                    field_14_arthro: field_14_arthro, field_14_stoxos: field_14_stoxos, field_17_onoma: field_17_onoma, field_17_epitheto: field_17_epitheto, field_17_idiotita: field_17_idiotita, field_29_diatakseis_rythmisis: field_29_diatakseis_rythmisis, field_29_yfistamenes_diatakseis: field_29_yfistamenes_diatakseis, field_30_diatakseis_katargisi: field_30_diatakseis_katargisi, field_30_katargoumenes_diatakseis: field_30_katargoumenes_diatakseis,
                    field_31_sxetiki_diataksi: field_31_sxetiki_diataksi, field_31_synarmodia_ypoyrgeia: field_31_synarmodia_ypoyrgeia, field_31_antikeimeno_synarmodiotitas: field_31_antikeimeno_synarmodiotitas, field_32_eksousiodotiki_diataksi: field_32_eksousiodotiki_diataksi, field_32_eidos_praksis: field_32_eidos_praksis, field_32_armodio_ypoyrgeio: field_32_armodio_ypoyrgeio, field_32_antikeimeno: field_32_antikeimeno, field_32_xronodiagramma: field_32_xronodiagramma,
                    field_21_upload: field21, field_23_upload: field23, field_36_upload: field36
                },
                    {
                        where: {
                            id: ekthesi_id
                        }
                    })

                //map variables to model's fields
                await database.rythmiseis.update({
                    auksisi_esodwn: auksisi_esodwn, meiwsi_dapanwn: meiwsi_dapanwn, eksikonomisi_xronou: eksikonomisi_xronou, apodotikotita: apodotikotita, amesa_allo: amesa_allo,
                    veltiwsi_ypiresiwn: veltiwsi_ypiresiwn, metaxirisi_politwn: metaxirisi_politwn, diafania_thesmwn: diafania_thesmwn, diaxirisi_kindynwn: diaxirisi_kindynwn, emmesa_allo: emmesa_allo,
                    proetimasia: proetimasia, ypodomi: ypodomi, kinitikotita: kinitikotita, emplekomenoi: emplekomenoi, efarmogi_allo: efarmogi_allo, apodosi_diaxirisis: apodosi_diaxirisis, ektelesi: ektelesi, apodosi_kostos: apodosi_kostos, apodosi_allo: apodosi_allo
                }, {
                    where: {
                        rythmisiId: ekthesi_id
                    }
                })

                // await database.field_9.update({
                //     symvaseis: symvaseis, sse_diamesolavisi: sse_diamesolavisi, sse_diaitisia: sse_diaitisia, mesos_xronos_mesolavisis: mesos_xronos_mesolavisis, mesos_xronos_diaitisias: mesos_xronos_diaitisias, diarkeia_sse: diarkeia_sse, wres_ergasias: wres_ergasias, ameivomenes_yperwries: ameivomenes_yperwries, atyximata: atyximata,
                //     ypsos_syntaksewn: ypsos_syntaksewn, ypsos_eisforwn: ypsos_eisforwn, ilikia_syntaksiodotisis: ilikia_syntaksiodotisis, aponomi_syntaksis: aponomi_syntaksis, syntaksiodotiki_dapani: syntaksiodotiki_dapani, prosfyges_syntaksis: prosfyges_syntaksis,
                //     anergia: anergia, makroxronia_anergoi: makroxronia_anergoi, anergia_newn: anergia_newn, anergia_gynaikwn: anergia_gynaikwn, anergia_ana_perifereia: anergia_ana_perifereia, anergia_morfwsi: anergia_morfwsi, deiktis_apasxolisis: deiktis_apasxolisis, meriki_apasxolisi: meriki_apasxolisi, symvasi_orismenoy_xronoy: symvasi_orismenoy_xronoy,
                //     kathestws_ftwxeias: kathestws_ftwxeias, sterisi_vasikwn_agathwn: sterisi_vasikwn_agathwn, noikokyria_ektaktes_anagkes: noikokyria_ektaktes_anagkes, epidomata_dapani: epidomata_dapani, paidia_se_orfanotrofeia: paidia_se_orfanotrofeia, astegoi_sitisi: astegoi_sitisi, proswrini_katoikia: proswrini_katoikia, kostos_frontidas: kostos_frontidas,
                //     astheneis: astheneis, paidiki_thnisimotita: paidiki_thnisimotita, dapanes_ygeias: dapanes_ygeias, dapanes_farmakwn: dapanes_farmakwn, arithmos_iatrwn_ana_1000_katoikous: arithmos_iatrwn_ana_1000_katoikous, arithmos_klinwn_ana_1000_katoikous: arithmos_klinwn_ana_1000_katoikous, diarkeia_epeigousas_nosileias: diarkeia_epeigousas_nosileias, eidikes_nosileutikes_ypiresies: eidikes_nosileutikes_ypiresies, anamoni_asthenwn: anamoni_asthenwn, arithmos_nosileiwn_ana_1000_katoikous: arithmos_nosileiwn_ana_1000_katoikous, arithmos_klinwn_ana_ypiresia: arithmos_klinwn_ana_ypiresia,
                //     apasxolisi_fylwn_synolika: apasxolisi_fylwn_synolika, apasxolisi_fylwn_perifereia: apasxolisi_fylwn_perifereia, apasxolisi_fylwn_oikonomia: apasxolisi_fylwn_oikonomia, apasxolisi_fylwn_ilikia: apasxolisi_fylwn_ilikia, anergia_fylwn_synolika: anergia_fylwn_synolika, anergia_fylwn_perifereia: anergia_fylwn_perifereia, anergia_fylwn_oikonomia: anergia_fylwn_oikonomia, anergia_fylwn_ilikia: anergia_fylwn_ilikia, autoapasxoloymenoi_fylo: autoapasxoloymenoi_fylo, ergodotes_fylo: ergodotes_fylo, ds_fylo: ds_fylo, symvoulia_fylo: symvoulia_fylo,
                //     aitimata_asyloy: aitimata_asyloy, metanasteytikes_roes: metanasteytikes_roes, apelaseis: apelaseis, monades_filoksenias: monades_filoksenias, filoksenia_paravatikotita: filoksenia_paravatikotita,
                //     dimosioi_ypalliloi: dimosioi_ypalliloi, monimoi_metaklitoi: monimoi_metaklitoi, analogia_ypallilwn: analogia_ypallilwn, prosvasi_internet: prosvasi_internet, intranet: intranet, analogia_ypologistwn: analogia_ypologistwn, istoselides: istoselides, kentra_pliroforisis: kentra_pliroforisis, eksypiretisi_ypiresies: eksypiretisi_ypiresies, kostos_proswpikou: kostos_proswpikou, kostos_diaxirisis_proswpikou: kostos_diaxirisis_proswpikou,
                //     drastes_adikimata: drastes_adikimata, adikimata_poinikoy_kwdika: adikimata_poinikoy_kwdika, diapraxthenta_adikimata: diapraxthenta_adikimata, etisia_statistika: etisia_statistika, adikimata_paranomi_eisodos: adikimata_paranomi_eisodos, syxnotita_egklimatwn: syxnotita_egklimatwn, eksixniasmena_egklimata: eksixniasmena_egklimata, ergazomenoi_asfaleia: ergazomenoi_asfaleia, katoikoi_ana_astynomiko: katoikoi_ana_astynomiko, analogia_astynomikwn_ana_1000_katoikoys: analogia_astynomikwn_ana_1000_katoikoys, dapanes_astynomias: dapanes_astynomias, poroi_antimetwpisis: poroi_antimetwpisis,
                //     arithmos_diaforwn: arithmos_diaforwn, dioikitikes_periptwseis: dioikitikes_periptwseis, xronos_epilysis_ypothesewn: xronos_epilysis_ypothesewn, ekdosi_apofasewn: ekdosi_apofasewn, mo_ypotheswn_dikasti: mo_ypotheswn_dikasti, akyrwsi_apofasewn: akyrwsi_apofasewn, ekswdikastikos_symvivasmos: ekswdikastikos_symvivasmos, enallaktiki_epilysi_diaforwn: enallaktiki_epilysi_diaforwn, nomiki_prostasia: nomiki_prostasia, kostos_prosfygis: kostos_prosfygis, ilektroniki_ypovoli_dikografwn: ilektroniki_ypovoli_dikografwn, diekperaiwsi_ypothesewn: diekperaiwsi_ypothesewn, poines_se_xrima: poines_se_xrima, kostos_swfronismou: kostos_swfronismou, analogia_fylakwn_kratoumenwn: analogia_fylakwn_kratoumenwn,
                //     pagkosmia_antagwnistikotita: pagkosmia_antagwnistikotita, ependyseis: ependyseis, ameses_ependyseis: ameses_ependyseis, nees_epixeiriseis: nees_epixeiriseis, kleistes_epixeiriseis: kleistes_epixeiriseis, dioikitiko_kostos: dioikitiko_kostos, mx_systasis_epixeirisis: mx_systasis_epixeirisis,
                //     atmosfairiki_rypansi: atmosfairiki_rypansi, viologikoi_katharismoi: viologikoi_katharismoi, katallhles_aktes: katallhles_aktes, katallilotita_diktyoy_ydreysis: katallilotita_diktyoy_ydreysis, xrisi_aporrimmatwn: xrisi_aporrimmatwn, aporrimmata_xyta: aporrimmata_xyta, katastrofi_dasikwn_ektasewn: katastrofi_dasikwn_ektasewn, anadaswseis: anadaswseis, prostateuomenes_perioxes: prostateuomenes_perioxes, proypologismos_prostasias_perivallontos: proypologismos_prostasias_perivallontos, katanalwsi_energeias_kata_kefali: katanalwsi_energeias_kata_kefali, katanalwsi_energeias_ana_morfi: katanalwsi_energeias_ana_morfi, katanalwsi_energeias_apo_ananewsimes_piges: katanalwsi_energeias_apo_ananewsimes_piges, meiwsi_ekpompwn_thermokipioy: meiwsi_ekpompwn_thermokipioy,
                //     allos_deiktis1: allos_deiktis1, allos_deiktis2: allos_deiktis2, allos_deiktis3: allos_deiktis3, allos_deiktis4: allos_deiktis4, allos_deiktis5: allos_deiktis5
                // }, {
                //     where: {
                //         field9Id: ekthesi_id              
                //     }
                // })

                if (!ekthesi) {
                    res.status(404).send("Error in updating ekthesi.");
                } else {
                    res.send({ redirect: "../user_views/history" });
                }
            } catch (e) {
                console.log(e);
            }
        }
    });

module.exports = routes;