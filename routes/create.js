const routes = require("express").Router();
let database = require("../services/database");
const csv = require("csv-parser");
const fs = require("fs");
const { body, check, validationResult } = require("express-validator");
var multer = require("multer");
const { authUser } = require("../middleware/auth");
const tables = require("../lib/tables");
const ministries = require("../lib/ministries");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); //Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
  },
});

var upload = multer({ storage: storage }).fields([
  { name: "field_21_upload", maxCount: 10 },
  { name: "field_23_upload", maxCount: 10 },
  { name: "field_36_upload", maxCount: 10 },
  { name: "nomosxedio", maxCount: 1 },
]);

routes.get("/:analysis", authUser, async (req, res, next) => {
  let analysis = req.params.analysis.substring(1); //removing first character
  try {
    var results = [];
    const valid_errors = req.session.errors;
    req.session.errors = null;
    let ministers, ministriesArray;
    let latest_entry = await database.ministries.max("id").catch((error) => {
      console.log(error);
    }); // get entry with highest id
    let res_data = await database.ministries
      .findOne({ where: { id: latest_entry } })
      .catch((error) => {
        console.log(error);
      });
    res_data = res_data.dataValues.ministries;
    ministers = ministries.getMinisters(res_data);
    ministriesArray = ministries.getMinistries(res_data);
    fs.createReadStream("./public/csvs/ASR_Tooltips.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        results = JSON.stringify(results);
        res.render("create", {
          analysis: analysis,
          rolos: req.session.rolos,
          errors: valid_errors,
          tooltips: results,
          ministers: ministers,
          ministries: ministries,
        });
      });
  } catch (err) {
    console.log("error: " + err);
  }
});
//routes.post('/', form_create.upload_files, form_submit.create_update_form

routes.post(
  "/:analysis",
  authUser,
  upload,
  [check("title", "Title is required").notEmpty()],
  async function (req, res, next) {
    let field21 = [];
    let field23 = [];
    let field36 = [];
    let nomosxedio = [];
    try {
      const file = req.files;
      console.log(req.body.ekthesi_glk);
      if (file.field_21_upload) {
        for (i in file.field_21_upload) {
          field21.push(file.field_21_upload[i].filename);
        }
      }
      if (file.field_23_upload) {
        for (i in file.field_23_upload) {
          field23.push(file.field_23_upload[i].filename);
        }
      }
      if (file.field_36_upload) {
        for (i in file.field_36_upload) {
          field36.push(file.field_36_upload[i].filename);
        }
      }
      if (file.nomosxedio) {
        nomosxedio.push({
          filename: file.nomosxedio[0].filename,
          upload_date: req.body.initial_submit,
        });
      }
    } catch (e) {
      console.log("Error message: " + e.message);
    }
    let field_9 = tables.createStaticTable(
      req.body,
      "_header",
      "_label",
      "_secondHeader"
    ); //data for field_9 as json
    let checkbox_tables = tables.createStaticTable(
      req.body,
      "_cbxHeader",
      "_cbxlabel",
      "_cbxsecondHeader"
    ); //data for fields 18-20 as json
    //add row to ekthesi model, map values from req.body
    let res_data = await database.ekthesi.create(req.body);
    await database.ekthesi_tables.create({
      static_tables: field_9,
      checkbox_tables: checkbox_tables,
      ekthesi_tablesId: res_data.id,
    });

    let keys = Object.keys(req.body);

    let field_14_arthro = tables.createDynamicTable(
      req.body,
      keys,
      "field_14_arthro"
    );
    let field_14_stoxos = tables.createDynamicTable(
      req.body,
      keys,
      "field_14_stoxos"
    );
    let field_17_onoma = tables.createDynamicTable(
      req.body,
      keys,
      "field_17_onoma"
    );
    let field_17_epitheto = tables.createDynamicTable(
      req.body,
      keys,
      "field_17_epitheto"
    );
    let field_17_idiotita = tables.createDynamicTable(
      req.body,
      keys,
      "field_17_idiotita"
    );
    let minister_surname = tables.createDynamicTable(
      req.body,
      keys,
      "minister_surname"
    );
    let minister_name = tables.createDynamicTable(
      req.body,
      keys,
      "minister_name"
    );
    let ministry = tables.createDynamicTable(req.body, keys, "ministry");
    let field_29_diatakseis_rythmisis = tables.createDynamicTable(
      req.body,
      keys,
      "field_29_diatakseis_rythmisis"
    );
    let field_29_yfistamenes_diatakseis = tables.createDynamicTable(
      req.body,
      keys,
      "field_29_yfistamenes_diatakseis"
    );
    let field_30_diatakseis_katargisi = tables.createDynamicTable(
      req.body,
      keys,
      "field_30_diatakseis_katargisi"
    );
    let field_30_katargoumenes_diatakseis = tables.createDynamicTable(
      req.body,
      keys,
      "field_30_katargoumenes_diatakseis"
    );
    let field_31_sxetiki_diataksi = tables.createDynamicTable(
      req.body,
      keys,
      "field_31_sxetiki_diataksi"
    );
    let field_31_synarmodia_ypoyrgeia = tables.createDynamicTable(
      req.body,
      keys,
      "field_31_synarmodia_ypoyrgeia"
    );
    let field_31_antikeimeno_synarmodiotitas = tables.createDynamicTable(
      req.body,
      keys,
      "field_31_antikeimeno_synarmodiotitas"
    );
    let field_32_eksousiodotiki_diataksi = tables.createDynamicTable(
      req.body,
      keys,
      "field_32_eksousiodotiki_diataksi"
    );
    let field_32_eidos_praksis = tables.createDynamicTable(
      req.body,
      keys,
      "field_32_eidos_praksis"
    );
    let field_32_armodio_ypoyrgeio = tables.createDynamicTable(
      req.body,
      keys,
      "field_32_armodio_ypoyrgeio"
    );
    let field_32_antikeimeno = tables.createDynamicTable(
      req.body,
      keys,
      "field_32_antikeimeno"
    );
    let field_32_xronodiagramma = tables.createDynamicTable(
      req.body,
      keys,
      "field_32_xronodiagramma"
    );
    let emd_processes = tables.createDynamicTable(req.body, keys, "process");

    var author = req.session.username;
    await database.ekthesi.update(
      {
        author: author,
        field_14_arthro: field_14_arthro,
        field_14_stoxos: field_14_stoxos,
        field_17_onoma: field_17_onoma,
        field_17_epitheto: field_17_epitheto,
        field_17_idiotita: field_17_idiotita,
        minister_name: minister_name,
        minister_surname: minister_surname,
        ministry: ministry,
        field_29_diatakseis_rythmisis: field_29_diatakseis_rythmisis,
        field_29_yfistamenes_diatakseis: field_29_yfistamenes_diatakseis,
        field_30_diatakseis_katargisi: field_30_diatakseis_katargisi,
        field_30_katargoumenes_diatakseis: field_30_katargoumenes_diatakseis,
        field_31_sxetiki_diataksi: field_31_sxetiki_diataksi,
        field_31_synarmodia_ypoyrgeia: field_31_synarmodia_ypoyrgeia,
        field_31_antikeimeno_synarmodiotitas:
          field_31_antikeimeno_synarmodiotitas,
        field_32_eksousiodotiki_diataksi: field_32_eksousiodotiki_diataksi,
        field_32_eidos_praksis: field_32_eidos_praksis,
        field_32_armodio_ypoyrgeio: field_32_armodio_ypoyrgeio,
        field_32_antikeimeno: field_32_antikeimeno,
        field_32_xronodiagramma: field_32_xronodiagramma,
        field_21_upload: field21,
        field_23_upload: field23,
        field_36_upload: field36,
        emd_processes: emd_processes,
        nomosxedio: nomosxedio,
      },
      {
        where: {
          id: res_data.id,
        },
      }
    );

    await database.audit.create({
      user: req.session.fname + " " + req.session.lname,
      data: req.body,
      timestamp: req.body.initial_submit,
      action: req.method,
      auditId: res_data.id,
    });

    res.send({ redirect: "../user_views/history" });
  }
);

module.exports = routes;
