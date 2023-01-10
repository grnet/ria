const { authAdmin, authUser } = require("../middleware/auth");
const routes = require("express").Router();
const database = require("../services/database");

routes.get("/", authUser, authAdmin, async (req, res, next) => {
  try {
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
    indexTables.sort();
    res.render("user_views/indexes", {
      indexes: indexes,
      indexTables: indexTables,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
  } //TODO: better handling
});

// TODO: implement index table change
routes.post("/", async (req, res, next) => {
  try {
    let indextable = await database.index_tables.findOne({
      where: { name: req.body.indexTable },
    }); 
    let result = await database.indexes
      .create({ name: req.body.name, indexTableId: indextable.id })
      .catch((err) => console.error(err));
    if (result) {
      res.status(200).send({ msg: "Ο δείκτης δημιουργήθηκε επιτυχώς." });
    } else {
      res.status(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη δημιουργία του δείκτη. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.put("/", async (req, res, next) => {
  try {
    let result = await database.indexes
      .update(
        { name: req.body.edit_name },
        { where: { name: req.body.indexSelect } }
      )
      .catch((err) => console.error(err));
    if (result) {
      res.status(200).send({ msg: "Ο δείκτης ενημερώθηκε επιτυχώς." });
    } else {
      res.status(500).send({
        msg: "Προέκυψε πρόβλημα κατά την ενημέρωση του δείκτη. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.delete("/", async (req, res, next) => {
  try {
    let result = await database.indexes
      .destroy({ where: { name: req.body.indexSelect } })
      .catch((err) => console.error(err));
    if (result) {
      res.status(200).send({ msg: "Ο δείκτης διαγράφηκε επιτυχώς." });
    } else {
      res.status(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη διαγραφή του δείκτη. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = routes;
