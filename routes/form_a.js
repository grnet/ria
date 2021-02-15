const routes = require('express').Router()
let database = require('../services/database');
const fs = require('fs');
let pdf_export = require('../controllers/export');
const csv = require('csv-parser')
const { body, check, validationResult } = require('express-validator');
var multer = require('multer');
const { authUser } = require('../controllers/auth');
//var getFields = multer();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)//Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
    }
})

var upload = multer({ storage: storage }).fields([{ name: 'field_21_upload', maxCount: 10 }, { name: 'field_23_upload', maxCount: 10 }, { name: 'field_36_upload', maxCount: 10 }]);

routes.get('/:entry_id',  async (req, res, next) => {
    
    try {
        let entry = await database.ekthesi.findOne({
            where: {
                id: req.params.entry_id
            }//, include: [{ model: database.rythmiseis }, { model: database.field_9 }]
        });

        let ekthesi_tables = await database.ekthesi_tables.findOne({
            where: {
                ekthesi_tablesId: req.params.entry_id
            }
        });

        pdf_name = entry.title + '.pdf';
        pdf_name = pdf_name.replace(/\s+/g, '');
        var pdf_exists;
        var results = [];
        if (fs.existsSync('./public/pdf_exports/' + pdf_name)) {

            console.log("The file exists.");
            pdf_exists = true;
        } else {
            console.log("The file does not exist.");
            pdf_exists = false;
        }
        if (entry && entry.dataValues) {

        } else {
            res.status(404).send("Not found")
        }
        fs.createReadStream('./public/csvs/ASR_Tooltips.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results = JSON.stringify(results);
                req.session.ekthesi_id = req.params.entry_id;
                res.render("form_a", { data: entry.dataValues, tables:ekthesi_tables.dataValues, rolos: req.session.rolos, pdf_exists: pdf_exists, tooltips: results });
            });
    } catch (err) {
        console.log('error: ' + err)
    }
});


//routes.post('/:entry_id', authUser, pdf_export.exportPDF) //router calls controller to handle the export
routes.post('/:entry_id', pdf_export.exportPDF) //router calls controller to handle the export

////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.put('/:entry_id', authUser, upload,
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
        console.time()
        let ekthesi_id = req.params.entry_id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) { // if array exists
            console.log(errors);
            //return res.status(422).json(errors.array());
        } else {

            try {                

                let entry = await database.ekthesi.findOne({
                    where: {
                        id: req.params.entry_id
                    }
                });

                let field21 = entry.field_21_upload;
                let field23 = entry.field_23_upload;
                let field36 = entry.field_36_upload;
                try {

                    const file = req.files;                    
                    if (file.field_21_upload) {
                        for (i in file.field_21_upload) {
                            field21.push(file.field_21_upload[i].filename)
                        }
                        //console.log("field21: " + field21);
                        // const error = new Error('Please upload a file')
                        // error.httpStatusCode = 400
                        // return next(error)

                    }
                    if (file.field_23_upload) {
                        for (i in file.field_23_upload) {
                            field23.push(file.field_23_upload[i].filename)
                            //console.log(file.field_23_upload[i].path);
                        }
                    }
                    if (file.field_36_upload) {
                        for (i in file.field_36_upload) {
                            field36.push(file.field_36_upload[i].filename)
                        }
                    }
                } catch (e) {
                    console.log("Error message: " + e.message);
                }

                let prefix, elemValue, cbxprefix;
                let cbxlabels = [];
                let row = [];
                let cbxrow = [];
                let table = [];
                let cbxtable = [];
                let tables = [];
                let data = req.body;//assign req.body to variable
                let keys = Object.keys(data);//get keys 
                let cbxtables = [];
                //create json for  field 9 static tables
                for (var elem in req.body) {
                    //if header push table into tables
                    if (elem.includes('_header')) {
                        if (table.length) {
                            tables.push({table:table});
                            table = [];
                        }
                    } 
                    //if label push row into table. Constructing individual tables
                    if (elem.includes('_label')) {
                        if (row.length) {
                            table.push({ row: row });
                            row = [];
                        }
                        prefix = elem.split('_label');
                        prefix = prefix.slice(0, -1);
                    } else if (elem.includes('_cbxlabel')) {//get all labels for checkbox tables
                        cbxprefix = elem.split('_cbxlabel');
                        cbxprefix = cbxprefix.slice(0, -1);
                        cbxlabels.push(cbxprefix);
                    }
                    //push into row. Construct individual table rows
                    if (!elem.includes('_label') && !elem.includes('_header') && !elem.includes('_secondHeader') && elem.includes(prefix)) {
                        elemValue = req.body[elem];
                        if (typeof elemValue != undefined) {
                            row.push({ [elem]: elemValue });
                        } else {
                            row.push('');
                        }
                    }

                }
                for (var label in cbxlabels) {
                    for (var elem in req.body) {

                        if (elem.includes('_cbxHeader')) {
                            if (cbxtable.length) {
                                cbxtables.push({row:cbxtable});
                                cbxtable = [];
                            }
                        } 

                        if (elem.includes('_cbxlabel')) {
                            if (cbxrow.length) {
                                cbxtable.push( {checkbox: cbxrow });
                                cbxrow = [];
                            }
                        }

                        if (elem.includes(cbxlabels[label]) && !elem.includes('_cbxlabel') && !elem.includes('_cbxHeader') && !elem.includes('_cbxsecondHeader')) {
                            elemValue = req.body[elem];
                            if (typeof elemValue != undefined) {
                                cbxrow.push({ [elem]: elemValue });
                            } 
                         }
                    }
                }                
                
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
                    if (keys[i].includes("field_14_arthro")) {
                        value = data[keys[i]];//get value from pair
                        key = keys[i];//get key 
                        field_14_arthro.push({ [key]: value });
                    } else if (keys[i].includes("field_14_stoxos")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_14_stoxos.push({ [key]: value });
                    } else if (keys[i].includes("field_17_onoma")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_17_onoma.push({ [key]: value });
                    } else if (keys[i].includes("field_17_epitheto")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_17_epitheto.push({ [key]: value });
                    } else if (keys[i].includes("field_17_idiotita")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_17_idiotita.push({ [key]: value });
                    } else if (keys[i].includes("field_29_diatakseis_rythmisis")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_29_diatakseis_rythmisis.push({ [key]: value });
                    } else if (keys[i].includes("field_29_yfistamenes_diatakseis")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_29_yfistamenes_diatakseis.push({ [key]: value });
                    } else if (keys[i].includes("field_30_diatakseis_katargisi")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_30_diatakseis_katargisi.push({ [key]: value });
                    } else if (keys[i].includes("field_30_katargoumenes_diatakseis")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_30_katargoumenes_diatakseis.push({ [key]: value });
                    } else if (keys[i].includes("field_31_sxetiki_diataksi")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_31_sxetiki_diataksi.push({ [key]: value });
                    } else if (keys[i].includes("field_31_synarmodia_ypoyrgeia")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_31_synarmodia_ypoyrgeia.push({ [key]: value });
                    } else if (keys[i].includes("field_31_antikeimeno_synarmodiotitas")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_31_antikeimeno_synarmodiotitas.push({ [key]: value });
                    } else if (keys[i].includes("field_32_eksousiodotiki_diataksi")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_32_eksousiodotiki_diataksi.push({ [key]: value });
                    } else if (keys[i].includes("field_32_eidos_praksis")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_32_eidos_praksis.push({ [key]: value });
                    } else if (keys[i].includes("field_32_armodio_ypoyrgeio")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_32_armodio_ypoyrgeio.push({ [key]: value });
                    } else if (keys[i].includes("field_32_antikeimeno")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_32_antikeimeno.push({ [key]: value });
                    } else if (keys[i].includes("field_32_xronodiagramma")) {
                        value = data[keys[i]];
                        key = keys[i];
                        field_32_xronodiagramma.push({ [key]: value });
                    }
                }

                let ekthesi = await database.ekthesi.update(req.body, {
                    where: {
                        id: ekthesi_id
                    }
                });

                await database.ekthesi.update({
                    field_14_arthro: field_14_arthro, field_14_stoxos: field_14_stoxos, field_17_onoma: field_17_onoma, field_17_epitheto: field_17_epitheto, field_17_idiotita: field_17_idiotita, field_29_diatakseis_rythmisis: field_29_diatakseis_rythmisis, field_29_yfistamenes_diatakseis: field_29_yfistamenes_diatakseis, field_30_diatakseis_katargisi: field_30_diatakseis_katargisi, field_30_katargoumenes_diatakseis: field_30_katargoumenes_diatakseis,
                    field_31_sxetiki_diataksi: field_31_sxetiki_diataksi, field_31_synarmodia_ypoyrgeia: field_31_synarmodia_ypoyrgeia, field_31_antikeimeno_synarmodiotitas: field_31_antikeimeno_synarmodiotitas, field_32_eksousiodotiki_diataksi: field_32_eksousiodotiki_diataksi, field_32_eidos_praksis: field_32_eidos_praksis, field_32_armodio_ypoyrgeio: field_32_armodio_ypoyrgeio, field_32_antikeimeno: field_32_antikeimeno, field_32_xronodiagramma: field_32_xronodiagramma,
                    field_21_upload: field21, field_23_upload: field23, field_36_upload: field36},
                 {
                    where: {
                        id: ekthesi_id
                    }
                });

                await database.ekthesi_tables.update({static_tables:tables, checkbox_tables:cbxtables}, {
                    where: {
                        ekthesi_tablesId: ekthesi_id
                    }
                });
                //console.log("field_29_diatakseis_rythmisis: " + field_29_diatakseis_rythmisis);
                var author = req.session.fname+' '+req.session.lname;

                await database.audit.create({ user: author, data: req.body, timestamp: req.body.last_updated, action: req.method, auditId: ekthesi_id });
                
                console.timeEnd();    

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