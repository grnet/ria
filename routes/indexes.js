const { authRole, authUser } = require("../middleware/auth");
const routes = require("express").Router();
const database = require("../services/database");

routes.get("/", authUser, authRole, async (req, res, next) => {
  try {
    const indexesResult = await database.indexes.findAll();
    const indexTablesResult = await database.index_tables.findAll();
    const indexes = [];
    const indexTables = [];
    for (i in indexTablesResult) {
        indexTables.push({
          name: indexTablesResult[i].dataValues.name,
        });
    }
    for (let i in indexesResult) {
        indexes.push({
          name: indexesResult[i].dataValues.name,
          table: indexTables[indexesResult[i].dataValues.indexTableId],
        });
    }
    for (let i in indexTables) {
        indexes[`${indexTables[i]}`] = [];
        index = indexes[`${indexTables[i]}`];
        for (let j in indexesResult) {
            if (indexTables[i] === indexesResult[j].table) {
                index.push(indexesResult[j].name);
            } 
        }
    }
    res.render("user_views/indexes", {
      indexes: indexes,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
  } //TODO: better handling
});

routes.post("/", async (req, res, next) => {
  try {
    let result = await database.indexes
      .create({ name: req.body.name, indexTableId: req.body.indexTable })
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Ο δείκτης δημιουργήθηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη δημιουργία του δείκτη. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.put("/:id", async (req, res, next) => {
  try {
    let result = await database.indexes
      .update({ name: req.body.name }, { where: { id: req.params.id } })
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Ο δείκτης ενημερώθηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά την ενημέρωση του δείκτη. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.delete("/:id", async (req, res, next) => {
  try {
    let result = await database.indexes
      .destroy({ where: { id: req.params.id } })
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Ο Υπουργός διαγράφηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη διαγραφή του Υπουργού. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = routes;
