const routes = require('express').Router()
let database = require("../services/database")
const csv = require('csv-parser')
const fs = require('fs');
const form_submit = require("../controllers/form")
const { body, check, validationResult } = require('express-validator');
var multer = require('multer');
const { authUser } = require('../controllers/auth');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)//Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
    }
})

var upload = multer({ storage: storage }).fields([{ name: 'field_21_upload', maxCount: 10 }, { name: 'field_23_upload', maxCount: 10 }, { name: 'field_36_upload', maxCount: 10 }]);

routes.get('/:analysis', authUser, function (req, res, next) {

    try {
        var results = [];
        const valid_errors = req.session.errors;
        req.session.errors = null;
        fs.createReadStream('./public/csvs/ASR_Tooltips.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results = JSON.stringify(results)
                //console.log('strngf: '+results);
                // results = JSON.parse(results)
                // console.log('prs: '+results);
                res.render("create", { analysis: req.params.analysis, rolos: req.session.rolos, errors: valid_errors, tooltips: results });
            });
    } catch (err) {
        console.log('error: ' + err)
    }

});
//routes.post('/', form_create.upload_files, form_submit.create_update_form

routes.post('/:analysis', authUser, upload, [check('title', 'Title is required').notEmpty()], async function (req, res, next) {

    let field21 = [];
    let field23 = [];
    let field36 = [];
    try {

        const file = req.files;
        console.log(req.body.ekthesi_glk)
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

    //add row to ekthesi model, map values from req.body & set foreign key equal to session username to get author 
    let res_data = await database.ekthesi.create(req.body);



    let prefix, elemValue, cbxprefix;
    let cbxlabels = [];
    let row = [];
    let cbxrow = [];
    let table = [];
    let cbxtable = [];
    let tables = [];
    let data = req.body;//assign req.body to variable
    //      data = data.replace(/\\n/g, ''); // <--- Newlines are globally replaced with empty string
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
                table.push({ [prefix]: row });
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
                    cbxtable.push( {[cbxlabels[label]]: cbxrow });
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

    await await database.ekthesi_tables.create({static_tables:tables, checkbox_tables:cbxtables, ekthesi_tablesId: res_data.id});

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
    var jsonObj = []
    let value, temp;
    for (i in keys) {//iterate through keys
        // console.log(i + " " + keys[i])
        if (keys[i].includes("field_14_arthro")) {
            value = data[keys[i]];//get value from pair
            temp = keys[i];//get key 
            field_14_arthro.push({ temp: value });
        } else if (keys[i].includes("field_14_stoxos")) {
            value = data[keys[i]];
            temp = keys[i];
            field_14_stoxos.push({ temp: value });
        } else if (keys[i].includes("field_17_onoma")) {
            value = data[keys[i]];
            temp = keys[i];
            field_17_onoma.push({ temp: value });
        } else if (keys[i].includes("field_17_epitheto")) {
            value = data[keys[i]];
            temp = keys[i];
            field_17_epitheto.push({ temp: value });
        } else if (keys[i].includes("field_17_idiotita")) {
            value = data[keys[i]];
            temp = keys[i];
            field_17_idiotita.push({ temp: value });
        } else if (keys[i].includes("field_29_diatakseis_rythmisis")) {
            value = data[keys[i]];
            temp = keys[i];
            field_29_diatakseis_rythmisis.push({ temp: value });
        } else if (keys[i].includes("field_29_yfistamenes_diatakseis")) {
            value = data[keys[i]];
            temp = keys[i];
            field_29_yfistamenes_diatakseis.push({ temp: value });
        } else if (keys[i].includes("field_30_diatakseis_katargisi")) {
            value = data[keys[i]];
            temp = keys[i];
            field_30_diatakseis_katargisi.push({ temp: value });
        } else if (keys[i].includes("field_30_katargoumenes_diatakseis")) {
            value = data[keys[i]];
            temp = keys[i];
            field_30_katargoumenes_diatakseis.push({ temp: value });
        } else if (keys[i].includes("field_31_sxetiki_diataksi")) {
            value = data[keys[i]];
            temp = keys[i];
            field_31_sxetiki_diataksi.push({ temp: value });
        } else if (keys[i].includes("field_31_synarmodia_ypoyrgeia")) {
            value = data[keys[i]];
            temp = keys[i];
            field_31_synarmodia_ypoyrgeia.push({ temp: value });
        } else if (keys[i].includes("field_31_antikeimeno_synarmodiotitas")) {
            value = data[keys[i]];
            temp = keys[i];
            field_31_antikeimeno_synarmodiotitas.push({ temp: value });
        } else if (keys[i].includes("field_32_eksousiodotiki_diataksi")) {
            value = data[keys[i]];
            temp = keys[i];
            field_32_eksousiodotiki_diataksi.push({ temp: value });
        } else if (keys[i].includes("field_32_eidos_praksis")) {
            value = data[keys[i]];
            temp = keys[i];
            field_32_eidos_praksis.push({ temp: value });
        } else if (keys[i].includes("field_32_armodio_ypoyrgeio")) {
            value = data[keys[i]];
            temp = keys[i];
            field_32_armodio_ypoyrgeio.push({ temp: value });
        } else if (keys[i].includes("field_32_antikeimeno")) {
            value = data[keys[i]];
            temp = keys[i];
            field_32_antikeimeno.push({ temp: value });
        } else if (keys[i].includes("field_32_xronodiagramma")) {
            value = data[keys[i]];
            temp = keys[i];
            field_32_xronodiagramma.push({ temp: value });
        }
        jsonObj.push({ [keys[i]]: data[keys[i]] });
    }
    var author = req.session.username;
    await database.ekthesi.update({
        author: author, field_14_arthro: field_14_arthro, field_14_stoxos: field_14_stoxos, field_17_onoma: field_17_onoma, field_17_epitheto: field_17_epitheto, field_17_idiotita: field_17_idiotita, field_29_diatakseis_rythmisis: field_29_diatakseis_rythmisis, field_29_yfistamenes_diatakseis: field_29_yfistamenes_diatakseis, field_30_diatakseis_katargisi: field_30_diatakseis_katargisi, field_30_katargoumenes_diatakseis: field_30_katargoumenes_diatakseis,
        field_31_sxetiki_diataksi: field_31_sxetiki_diataksi, field_31_synarmodia_ypoyrgeia: field_31_synarmodia_ypoyrgeia, field_31_antikeimeno_synarmodiotitas: field_31_antikeimeno_synarmodiotitas, field_32_eksousiodotiki_diataksi: field_32_eksousiodotiki_diataksi, field_32_eidos_praksis: field_32_eidos_praksis, field_32_armodio_ypoyrgeio: field_32_armodio_ypoyrgeio, field_32_antikeimeno: field_32_antikeimeno, field_32_xronodiagramma: field_32_xronodiagramma,
        field_21_upload: field21, field_23_upload: field23, field_36_upload: field36
    },
        {
            where: {
                id: res_data.id
            }
        })
    //data = JSON.stringify(data);
    await database.audit.create({ user: req.session.fname+' '+req.session.lname, data: req.body, timestamp: req.body.initial_submit, action: req.method, auditId: res_data.id });

    res.send({ redirect: "../user_views/history" });
});

module.exports = routes;
