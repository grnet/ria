const routes = require("express").Router();
let database = require("../services/database");
const { body, check, validationResult } = require("express-validator");
var multer = require("multer");
const { authUser } = require("../middleware/auth");
const tables = require("../lib/tables");
const ministries = require("../lib/ministries");
const tooltipsCsv = require("../lib/tooltips");

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
  const type = req.params.analysis.substring(1); //removing first character
  try {
    //TODO: remove errors
    const valid_errors = req.session.errors;
    req.session.errors = null;
    const user = req.session.user;
    
    const tooltips = JSON.stringify(await tooltipsCsv.getTooltips());
    const ministriesResult = await ministries.getMinistries();
    const ministersResult = await ministries.getMinisters(ministriesResult);

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

    res.render("create", {
      type: type,
      role: req.session.user.role,
      errors: valid_errors,
      tooltips: tooltips,
      ministers: ministersResult,
      ministries: ministriesResult,
      user: user,
      indexes:indexes
    });
  } catch (err) {
    // TODO: add status error code
    //TODO: should collect all status errors to app.js
    console.log("error: " + err);
  }
});

routes.post(
  "/:analysis",
  authUser,
  upload,
  [check("title", "Title is required").notEmpty()],
  async function (req, res, next) {
    const field21 = [];
    const field23 = [];
    const field36 = [];
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
      if (file.nomosxedio) {
        bill.push({
          filename: file.nomosxedio[0].filename,
          upload_date: req.body.initial_submit,
        });
      }
    } catch (e) {
      console.log("Error message: " + e.message);
    }
    const uploads = [
      { field21: field21, field23: field23, field36: field36, bill: bill },
    ];

    let res_data = await database.analysis.create({
      data: req.body,
      accountingData: {},
      uploads: uploads,
      accountingUploads: [],
      type: req.body.type,
      status: req.body.status,
      author: req.session.user.taxId,
    });

    await database.audit.create({
      user: req.session.user.fname + " " + req.session.user.lname,
      data: req.body,
      timestamp: req.body.initial_submit,
      action: req.method,
      auditId: res_data.id,
    });

    res.send({ redirect: "../user_views/history" });
  }
);

module.exports = routes;
