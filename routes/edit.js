const routes = require("express").Router();
let database = require("../services/database");
const fs = require("fs");
let pdf_export = require("../middleware/export");
let diffPdf = require("../middleware/diff");
let accounting_pdf_export = require("../middleware/export_glk");
const tooltipsCsv = require("../lib/tooltips");
const diff = require("diff");
const { body, check, validationResult } = require("express-validator");
var multer = require("multer");
const { authUser, authRole, authAgency } = require("../middleware/auth");
const tables = require("../lib/tables");
const ministries = require("../lib/ministries");
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

routes.get(
  "/:entry_id",
  authUser,
  authRole,
  authAgency,
  async (req, res, next) => {
    try {
      let entry = await database.analysis.findOne({
        where: {
          id: req.params.entry_id,
        },
      }); //TODO: add error handling

      const user = req.session.user;
      pdf_name = `${entry.title}.pdf`;
      pdf_name = pdf_name.replace(/\s+/g, ""); //buggy?
      var pdf_exists;

      fs.existsSync(`./public/exports/${pdf_name}`)
        ? (pdf_exists = true)
        : (pdf_exists = false);

      const data = entry.dataValues.data;
      const accountingData = entry.dataValues.accountingData;
      const uploads = entry.dataValues.uploads;
      const accountingUploads = entry.dataValues.accountingUploads;
      const type = entry.dataValues.type;
      const id = entry.dataValues.id;
      const status = entry.dataValues.status;

      const indexesResult = await database.indexes.findAll();
      const indexTablesResult = await database.index_tables.findAll();
      const indexes = {};
      const indexTables = [];
      for (i in indexTablesResult) {
        indexTables.push(indexTablesResult[i].dataValues.name);
      }

      for (let i in indexTables) {
        indexes[`${indexTables[i]}`] = [];
        for (let j in indexesResult) {
          if (
            indexesResult[i].dataValues.id ===
            indexesResult[j].dataValues.indexTableId
          ) {
            indexes[`${indexTables[i]}`].push(indexesResult[j].name);
          }
        }
        indexes[`${indexTables[i]}`].sort();
      }

      const field_18 = await tables.getCheckboxTableData(
        data,
        "field_18",
        true
      );
      const field_19 = await tables.getCheckboxTableData(
        data,
        "field_19",
        true
      );
      const field_20 = await tables.getCheckboxTableData(
        data,
        "field_20",
        true
      );
      const field_14 = await tables.getTableData(
        ["field_14_arthro", "field_14_stoxos"],
        data
      );
      const field_29 = await tables.getTableData(
        ["field_29_diatakseis_rythmisis", "field_29_yfistamenes_diatakseis"],
        data
      );
      const field_30 = await tables.getTableData(
        ["field_30_diatakseis_katargisi", "field_30_katargoumenes_diatakseis"],
        data
      );
      const field_31 = await tables.getTableData(
        [
          "field_31_sxetiki_diataksi",
          "field_31_synarmodia_ypoyrgeia",
          "field_31_antikeimeno_synarmodiotitas",
        ],
        data
      );
      const field_32 = await tables.getTableData(
        [
          "field_32_eksousiodotiki_diataksi",
          "field_32_eidos_praksis",
          "field_32_armodio_ypoyrgeio",
          "field_32_antikeimeno",
          "field_32_xronodiagramma",
        ],
        data
      );
      const signatories = await tables.getTableData(
        ["minister_name", "minister_role", "minister_ministry"],
        data
      );
      const field_17_signatories = await tables.getTableData(
        [
          "field_17_minister_name",
          "field_17_minister_role",
          "field_17_minister_ministry",
        ],

        accountingData
      );
      const processes = await tables.getTableData(["process"], data);
      const field_9 = await tables.getField9(data);

      const tooltips = JSON.stringify(await tooltipsCsv.getTooltips());
      const ministriesResult = await ministries.getMinistries();
      const ministersResult = await ministries.getMinisters(ministriesResult);

      res.render("edit_analysis", {
        //TODO: review endpoint name
        id: id,
        type: type,
        status: status,
        data: data,
        accountingData: accountingData,
        accountingUploads: accountingUploads[0],
        tables: {
          field_9: field_9,
          field_14: field_14,
          field_17_signatories: field_17_signatories,
          field_18: field_18,
          field_19: field_19,
          field_20: field_20,
          field_29: field_29,
          field_30: field_30,
          field_31: field_31,
          field_32: field_32,
          processes: processes,
          signatories: signatories,
        }, // TODO: create tables
        role: req.session.user.role,
        pdf_exists: pdf_exists,
        tooltips: tooltips,
        ministries: ministriesResult,
        ministers: ministersResult,
        user: user,
        indexes: indexes,
        uploads: uploads[0],
      });
    } catch (err) {
      console.log("error: " + err);
    }
  }
);

routes.post(
  "/:entry_id/export/accounting",
  authUser,
  authRole,
  authAgency,
  accounting_pdf_export.exportGlk
); //router calls controller to handle the export
routes.post(
  "/:entry_id/export",
  authUser,
  authRole,
  authAgency,
  pdf_export.exportPDF
); //router calls controller to handle the export

////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.put(
  "/:entry_id",
  authUser,
  authRole,
  authAgency,
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
    let analysis_id = req.params.entry_id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if array exists
      console.log(errors);
      //return res.status(422).json(errors.array());
    } else {
      try {
        const entry = await database.analysis.findOne({
          where: {
            id: req.params.entry_id,
          },
        });

        const field21 = entry.uploads[0].field21;
        const field23 = entry.uploads[0].field23;
        const field36 = entry.uploads[0].field36;
        const signed_pdf = [];
        // const bill = entry.uploads[0].bill;
        const bill = [];
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
            for (i in file.signed_pdf_upload) {
              signed_pdf.push(file.signed_pdf_upload[i].filename);
            }
          }
          if (file.nomosxedio) {
            bill.push({
              filename: file.nomosxedio[0].filename,
              upload_date: req.body.last_updated,
            });
          }
        } catch (e) {
          console.log("Error message: " + e.message);
        }

        const uploads = req.file
          ? [
              {
                field21: field21,
                field23: field23,
                field36: field36,
                bill: bill,
                signed_pdf: signed_pdf,
              },
            ]
          : entry.uploads;

        let analysis = await database.analysis.update(
          {
            data: req.body,
            uploads: uploads,
            author: req.session.user.taxId,
            status: req.body.status,
          },
          {
            where: {
              id: analysis_id,
            },
          }
        );

        const author = req.session.user.fname + " " + req.session.user.lname;

        await database.audit.create({
          user: author,
          data: req.body,
          timestamp: req.body.last_updated,
          action: req.method,
          auditId: analysis_id,
        });

        if (!analysis) {
          res.status(404).send("Error in updating analysis.");
        } else {
          res.send({ redirect: "../user_views/history" });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
);

routes.put(
  "/:entry_id/accounting",
  authUser,
  authRole,
  authAgency,
  upload,
  async function (req, res, next) {
    let analysis_id = req.params.entry_id;
    try {
      const signed_accounting_office_pdf = [];
      try {
        const file = req.files;
        if (file.signed_glk_pdf_upload) {
          const date = new Date().toLocaleString("el-GR", {
            timeZone: "Europe/Athens",
          });
          signed_accounting_office_pdf.push({
            filename: file.signed_glk_pdf_upload[0].filename,
            upload_date: date,
          });
        }
      } catch (e) {
        console.log("Error message: " + e.message);
      }

      let analysis = await database.analysis.update(
        {
          accountingData: req.body,
          accountingUploads: signed_accounting_office_pdf,
          author: req.session.user.taxId,
          status: req.body.status,
        },
        {
          where: {
            id: analysis_id,
          },
        }
      );

      const author = req.session.user.fname + " " + req.session.user.lname;

      await database.audit.create({
        user: author,
        data: req.body,
        timestamp: req.body.last_updated,
        action: req.method,
        auditId: analysis_id,
      });

      if (!analysis) {
        res.status(404).send("Error in updating analysis.");
      } else {
        res.send({ redirect: "../user_views/history" });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

routes.put(
  "/:entry_id/delete_file",
  authUser,
  authRole,
  authAgency,
  async (req, res, next) => {
    let entry = await database.analysis.findOne({
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
        await database.analysis.update(
          { field_21_upload: entry.field_21_upload },
          { where: { id: entry.id } }
        );
      } else if (entry.field_23_upload.includes(req.body.deleted_file)) {
        let index23 = entry.field_23_upload.indexOf(req.body.deleted_file); //find index of file to be deleted
        entry.field_23_upload.splice(index23, 1); //delete position of index, count 1
        await database.analysis.update(
          { field_23_upload: entry.field_23_upload },
          { where: { id: entry.id } }
        );
      } else if (entry.field_36_upload.includes(req.body.deleted_file)) {
        let index36 = entry.field_36_upload.indexOf(req.body.deleted_file); //find index of file to be deleted
        entry.field_36_upload.splice(index36, 1); //delete position of index, count 1
        await database.analysis.update(
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
  }
);

//TODO: on delete remove uploaded and exported files
routes.delete(
  "/:entry_id/delete",
  authUser,
  authRole,
  authAgency,
  async function (req, res, next) {
    let entry = await database.analysis.findOne({
      where: { id: req.params.entry_id },
    });
    entry ? entry.destroy().then(res.sendStatus(200)) : res.sendStatus(404);
  }
);

routes.post(
  "/:entry_id/versions",
  authUser,
  authRole,
  authAgency,
  async function (req, res, next) {
    let entries = await database.audit.findAll({
      where: { auditId: req.params.entry_id },
    });

    entries
      ? res.status(200).json({ entries: entries })
      : res.sendStatus(404).send("Versions not found.");
  }
);

routes.post(
  "/:entry_id/diff/",
  authUser,
  authRole,
  authAgency,
  async function (req, res, next) {
    let target1 = req.body.firstTargetDate;
    let target2 = req.body.secondTargetDate;
    let entry1 = await database.audit.findOne({
      where: { id: target1 },
    });
    let entry2 = await database.audit.findOne({
      where: { id: target2 },
    });

    let data = {};
    for (i in entry1.data) {
      if (entry1.data[i] === undefined) entry1.data[i] = "";
      if (entry2.data[i] === undefined) entry2.data[i] = "";
      let diffchars;
      if (Array.isArray(entry1.data[i]) || Array.isArray(entry2.data[i])) {
        diffchars = diff.diffWords(entry2.data[i][0], entry2.data[i][1]);
      } else {
        diffchars = diff.diffWords(entry1.data[i], entry2.data[i]);
      }

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
    req.diffData = data;
    //TODO: add second loop to handle accountingData
    next();
  },
  diffPdf.exportPDF
);

module.exports = routes;
