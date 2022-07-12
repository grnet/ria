const routes = require("express").Router();
let database = require("../services/database");
const fs = require("fs");
let pdf_export = require("../middleware/export");
let glk_pdf_export = require("../middleware/export_glk");
const csv = require("csv-parser");
const diff = require("diff");
const { body, check, validationResult } = require("express-validator");
var multer = require("multer");
const { authUser } = require("../middleware/auth");
const tables = require("../lib/tables");
const ministries = require("../lib/ministries")
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); //Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })
  },
});

var upload = multer({ storage: storage }).fields([
  { name: "field_21_upload", maxCount: 10 },
  { name: "field_23_upload", maxCount: 10 },
  { name: "field_36_upload", maxCount: 10 },
  { name: "signed_pdf_upload", maxCount: 1 },
  { name: "nomosxedio" },
  { name: "signed_glk_pdf_upload", maxCount: 1 },
]);

routes.get("/:entry_id", authUser, async (req, res, next) => {
  try {
    let entry = await database.ekthesi.findOne({
      where: {
        id: req.params.entry_id,
      }, //, include: [{ model: database.ekthesi_tables }] //join tables
    });

    const user = req.session.user;
    let ekthesi_tables = await database.ekthesi_tables.findOne({
      where: {
        ekthesi_tablesId: req.params.entry_id,
      },
    });

    pdf_name = `${entry.title}.pdf`;
    pdf_name = pdf_name.replace(/\s+/g, ""); //buggy?
    var pdf_exists;
    var results = [];
    let ministers, ministriesArray;
    fs.existsSync(`./public/pdf_exports/${pdf_name}`)
      ? (pdf_exists = true)
      : (pdf_exists = false);

    if (entry && entry.dataValues) {
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
      //review using commented code bellow
      // let form = JSON.parse(fs.readFileSync(`./public/jsons/forms/${id}.json`, 'utf8', (err) => {
      //     if (err) return console.error(err);
      // }));
      fs.createReadStream("./public/csvs/ASR_Tooltips.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          results = JSON.stringify(results);
          req.session.ekthesi_id = req.params.entry_id;
          res.render("form_a", {
            data: entry.dataValues,
            tables: ekthesi_tables.dataValues,
            rolos: req.session.rolos,
            pdf_exists: pdf_exists,
            tooltips: results,
            ministries: ministriesArray,
            ministers: ministers,
            user: user,
          });
        });
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.log("error: " + err);
  }
});

routes.post("/export/glk/:entry_id", authUser, glk_pdf_export.exportGlk); //router calls controller to handle the export
routes.post("/:entry_id", authUser, pdf_export.exportPDF); //router calls controller to handle the export

////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.put(
  "/:entry_id",
  authUser,
  upload,
  //VALIDATION RULES
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
    if (!errors.isEmpty()) {
      // if array exists
      console.log(errors);
      //return res.status(422).json(errors.array());
    } else {
      try {
        let entry = await database.ekthesi.findOne({
          where: {
            id: req.params.entry_id,
          },
        });

        let field21 = entry.field_21_upload;
        let field23 = entry.field_23_upload;
        let field36 = entry.field_36_upload;
        let signed_pdf = entry.signed_pdf_upload;
        let nomosxedio = entry.nomosxedio;
        let signed_glk_pdf_upload = entry.signed_glk_pdf_upload;
        try {
          const file = req.files;
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
          if (file.signed_pdf_upload) {
            signed_pdf = [];
            for (i in file.signed_pdf_upload) {
              signed_pdf.push(file.signed_pdf_upload[i].filename);
            }
          }
          if (file.nomosxedio) {
            nomosxedio.push({
              filename: file.nomosxedio[0].filename,
              upload_date: req.body.last_updated,
            });
          }
          if (file.signed_glk_pdf_upload) {
            let date = new Date().toLocaleString("el-GR", {
              timeZone: "Europe/Athens",
            });
            signed_glk_pdf_upload.push({
              filename: file.signed_glk_pdf_upload[0].filename,
              upload_date: date,
            });
          }
        } catch (e) {
          console.log("Error message: " + e.message);
        }

        let keys = Object.keys(req.body);

        let field_9 = tables.createStaticTable(
          req.body,
          "_header",
          "_label",
          "_secondHeader",
          false
        ); //data for field_9 
        let checkbox_tables = tables.createStaticTable(
          req.body,
          "_cbxHeader",
          "_cbxlabel",
          "_cbxsecondHeader",
          false
        ); //data for fields 18-20 

        let field_14_arthro = tables.createDynamicTable(
          req.body,
          keys,
          "field_14_arthro",
          entry.field_14_arthro
        );
        let field_14_stoxos = tables.createDynamicTable(
          req.body,
          keys,
          "field_14_stoxos",
          entry.field_14_stoxos
        );
        let field_17_minister_name = tables.createDynamicTable(
          req.body,
          keys,
          "field_17_minister_name",
          entry.field_17_minister_name
        );
        let field_17_minister_surname = tables.createDynamicTable(
          req.body,
          keys,
          "field_17_minister_surname",
          entry.field_17_minister_surname
        );
        let field_17_minister_role = tables.createDynamicTable(
          req.body,
          keys,
          "field_17_minister_role",
          entry.field_17_minister_role
        );
        let field_17_minister_ministry = tables.createDynamicTable(
          req.body,
          keys,
          "field_17_minister_ministry",
          entry.field_17_minister_ministry
        );
        let minister_surname = tables.createDynamicTable(
          req.body,
          keys,
          "minister_surname",
          entry.minister_surname,
          'field_17'
        );
        let minister_name = tables.createDynamicTable(
          req.body,
          keys,
          "minister_name",
          entry.minister_name,
          "field_17"
        );
        let minister_role = tables.createDynamicTable(
          req.body,
          keys,
          "minister_role",
          entry.minister_role,
          "field_17"
        );
        let minister_ministry = tables.createDynamicTable(
          req.body,
          keys,
          "minister_ministry",
          entry.minister_ministry,
          "field_17"
        );
        let field_29_diatakseis_rythmisis = tables.createDynamicTable(
          req.body,
          keys,
          "field_29_diatakseis_rythmisis",
          entry.field_29_diatakseis_rythmisis
        );
        let field_29_yfistamenes_diatakseis = tables.createDynamicTable(
          req.body,
          keys,
          "field_29_yfistamenes_diatakseis",
          entry.field_29_yfistamenes_diatakseis
        );
        let field_30_diatakseis_katargisi = tables.createDynamicTable(
          req.body,
          keys,
          "field_30_diatakseis_katargisi",
          entry.field_30_diatakseis_katargisi
        );
        let field_30_katargoumenes_diatakseis = tables.createDynamicTable(
          req.body,
          keys,
          "field_30_katargoumenes_diatakseis",
          entry.field_30_katargoumenes_diatakseis
        );
        let field_31_sxetiki_diataksi = tables.createDynamicTable(
          req.body,
          keys,
          "field_31_sxetiki_diataksi",
          entry.field_31_sxetiki_diataksi
        );
        let field_31_synarmodia_ypoyrgeia = tables.createDynamicTable(
          req.body,
          keys,
          "field_31_synarmodia_ypoyrgeia",
          entry.field_31_synarmodia_ypoyrgeia
        );
        let field_31_antikeimeno_synarmodiotitas = tables.createDynamicTable(
          req.body,
          keys,
          "field_31_antikeimeno_synarmodiotitas",
          entry.field_31_antikeimeno_synarmodiotitas
        );
        let field_32_eksousiodotiki_diataksi = tables.createDynamicTable(
          req.body,
          keys,
          "field_32_eksousiodotiki_diataksi",
          entry.field_32_eksousiodotiki_diataksi
        );
        let field_32_eidos_praksis = tables.createDynamicTable(
          req.body,
          keys,
          "field_32_eidos_praksis",
          entry.field_32_eidos_praksis
        );
        let field_32_armodio_ypoyrgeio = tables.createDynamicTable(
          req.body,
          keys,
          "field_32_armodio_ypoyrgeio",
          entry.field_32_armodio_ypoyrgeio
        );
        let field_32_antikeimeno = tables.createDynamicTable(
          req.body,
          keys,
          "field_32_antikeimeno",
          entry.field_32_antikeimeno
        );
        let field_32_xronodiagramma = tables.createDynamicTable(
          req.body,
          keys,
          "field_32_xronodiagramma",
          entry.field_32_xronodiagramma
        );

        let ekthesi = await database.ekthesi.update(req.body, {
          where: {
            id: ekthesi_id,
          },
        });

        await database.ekthesi.update(
          {
            field_15_rythmiseis: req.body.f15,
            field_16_kratikos_proypologismos: req.body.f16_1,
            field_16_proypologismos_forea: req.body.f16_2,
            field_17_oikonomika_apotelesmata: req.body.f17,
            field_14_arthro: field_14_arthro,
            field_14_stoxos: field_14_stoxos,
            field_17_minister_name: field_17_minister_name,
            field_17_minister_surname: field_17_minister_surname,
            field_17_minister_role: field_17_minister_role,
            field_17_minister_ministry: field_17_minister_ministry,
            minister_name: minister_name,
            minister_surname: minister_surname,
            minister_role: minister_role,
            minister_ministry: minister_ministry,
            field_29_diatakseis_rythmisis: field_29_diatakseis_rythmisis,
            field_29_yfistamenes_diatakseis: field_29_yfistamenes_diatakseis,
            field_30_diatakseis_katargisi: field_30_diatakseis_katargisi,
            field_30_katargoumenes_diatakseis:
            field_30_katargoumenes_diatakseis,
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
            signed_pdf_upload: signed_pdf,
            nomosxedio: nomosxedio,
            signed_glk_pdf_upload: signed_glk_pdf_upload,
          },
          {
            where: {
              id: ekthesi_id,
            },
          }
        );

        await database.ekthesi_tables.update(
          { static_tables: field_9, checkbox_tables: checkbox_tables },
          {
            where: {
              ekthesi_tablesId: ekthesi_id,
            },
          }
        );
        var author = req.session.fname + " " + req.session.lname;

        await database.audit.create({
          user: author,
          data: req.body,
          timestamp: req.body.last_updated,
          action: req.method,
          auditId: ekthesi_id,
        });

        if (!ekthesi) {
          res.status(404).send("Error in updating ekthesi.");
        } else {
          res.send({ redirect: "../user_views/history" });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
);

routes.put("/:entry_id/delete_file", authUser, async (req, res, next) => {
  let entry = await database.ekthesi.findOne({
    where: {
      id: req.params.entry_id,
    },
  });
  entry = entry.dataValues;
  let filePath = `public/uploads/${req.body.deleted_file}`;

  try {
    if (entry.field_21_upload.includes(req.body.deleted_file)) {
      let index21 = entry.field_21_upload.indexOf(req.body.deleted_file); //find index of file to be deleted
      entry.field_21_upload.splice(index21, 1); //delete position of index, count 1
      await database.ekthesi.update(
        { field_21_upload: entry.field_21_upload },
        { where: { id: entry.id } }
      );
    } else if (entry.field_23_upload.includes(req.body.deleted_file)) {
      let index23 = entry.field_23_upload.indexOf(req.body.deleted_file); //find index of file to be deleted
      entry.field_23_upload.splice(index23, 1); //delete position of index, count 1
      await database.ekthesi.update(
        { field_23_upload: entry.field_23_upload },
        { where: { id: entry.id } }
      );
    } else if (entry.field_36_upload.includes(req.body.deleted_file)) {
      let index36 = entry.field_36_upload.indexOf(req.body.deleted_file); //find index of file to be deleted
      entry.field_36_upload.splice(index36, 1); //delete position of index, count 1
      await database.ekthesi.update(
        { field_36_upload: entry.field_36_upload },
        { where: { id: entry.id } }
      );
    }
    fs.unlink(filePath, async function (err) {
      if (err && err.code == "ENOENT") {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
        res.sendStatus(404);
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
        res.sendStatus(403);
      } else {
        console.info(`removed`);
        res.sendStatus(200);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

routes.delete(
  "/:entry_id/delete_analysis",
  authUser,
  async function (req, res, next) {
    let entry = await database.ekthesi.findOne({
      where: { id: req.params.entry_id },
    });
    entry ? entry.destroy().then(res.sendStatus(200)) : res.sendStatus(404);
  }
);

routes.post("/:entry_id/versions", authUser, async function (req, res, next) {
  let entries = await database.audit.findAll({
    where: { auditId: req.params.entry_id },
  });

  entries
    ? res.status(200).json({ entries: entries })
    : res.sendStatus(404).send("Versions not found.");
});

routes.post("/:entry_id/diff/", authUser, async function (req, res, next) {
  let target1 = req.body.target1;
  let target2 = req.body.target2;
  let entry1 = await database.audit.findOne({
    where: { id: target1 },
  });
  let entry2 = await database.audit.findOne({
    where: { id: target2 },
  });

  let data = {};
  for (i in entry1.data) {
    const diffchars = diff.diffWords(entry1.data[i], entry2.data[i]);
    diffchars.forEach((part) => {
      // green for additions, red for deletions
     part.added
       ? data[i]
         ? data[i].push({ value: part.value, color: "green" })
         : (data[i] = [{ value: part.value, color: "green" }])
       : part.removed
       ? data[i]
         ? data[i].push({ value: part.value, color: "red" })
         : (data[i] = [{ value: part.value, color: "red" }])
       : data[i]
       ? data[i].push({ value: part.value, color: "" })
       : (data[i] = [{ value: part.value, color: "" }]);
    });
  }
res.status(200).json({ data:data })
});

module.exports = routes;
