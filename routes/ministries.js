const { authRole, authUser } = require("../middleware/auth");
const routes = require("express").Router();
const { spawn } = require("child_process");
const database = require("../services/database");

routes.get("/", authUser, authRole, async (req, res, next) => {
  try {
    const ministriesResult = await ministries.getMinistries();
    res.render("ministries", {
      ministries: ministriesResult,
    });
  } catch (err) {
    console.error(err);
  } //TODO: better handling
});

routes.get("/ministers", authUser, authRole, async (req, res, next) => {
  try {
    const ministriesResult = await ministries.getMinistries();
    const ministersResult = await ministries.getMinisters(ministriesResult);
    res.render("ministries/ministers", {
      ministries: ministriesResult,
      ministers: ministersResult,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
  } //TODO: better handling
});

routes.post("/gov", authUser, authRole, async (req, res, next) => {
  const script = spawn("python3", ["./public/python_scripts/data_scrapper.py"]);
  script.stdout.on("data", async (data) => {
    req.session.success = [];
    let parsed_data = JSON.parse(data);
    for (let i in parsed_data[1]) {
      if (parsed_data[1][i]) {
        let name = parsed_data[1][i];
        let result = await database.ministries
          .findOne({ where: { name: name } })
          .catch(); //TODO: implement error handling
        if (!result) await database.ministries.create({ name: name }).catch();
      }
    }
    for (let i in parsed_data[0]) {
      let ministryId;
      const ministry = parsed_data[0][i].ministry;
      const roles = parsed_data[0][i].roles;
      if (ministry) {
        let result = await database.ministries
          .findOne({ where: { name: ministry } })
          .catch(); //TODO: implement error handling
        if (result) {
          ministryId = result.dataValues.id;
        }
      }
      for (let j in roles) {
        const role = roles[j].role;
        const responsibility = roles[j].responsibility;
        const name = roles[j].name;

        if (name) {
          let minister = await database.minister
            .findOne({ where: { name: name } })
            .catch(); //TODO: implement error handling
          if (!minister) {
            ministryId
              ? await database.minister
                  .create({
                    name: name,
                    role: role,
                    responsibility: responsibility,
                    ministryId: ministryId,
                  })
                  .catch()
              : await database.minister
                  .create({
                    name: name,
                    role: role,
                    responsibility: responsibility,
                  })
                  .catch();
          }
        } else {
          // TODO: test
          res.sendStatus(502).send({
            msg: "Η επικαιροποίηση των Υπουργείων απέτυχε.",
          });
        }
      }
    }
    res.sendStatus(200);
  });

  script.stderr.on("data", (data) => {
    res.sendStatus(502).send({
      msg: "Η επικαιροποίηση των Υπουργείων απέτυχε.",
    });
  });
});

routes.post("/", async (req, res, next) => {
  try {
    let result = await database.ministries
      .create({ name: req.body.name })
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Το Υπουργείο δημιουργήθηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη δημιουργία του Υπουργείου. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.post("/minister", async (req, res, next) => {
  try {
    let result = await database.ministries
      .create({
        name: req.body.name,
        role: req.body.role,
        responsibility: req.body.responsibility,
        ministryId: req.body.ministryId,
      })
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Ο Υπουργός δημιουργήθηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη δημιουργία του Υπουργού. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.put("/:id", async (req, res, next) => {
  try {
    let result = await database.ministries
      .update({ name: req.body.name }, {where: { id: req.params.id }})
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Το Υπουργείο ενημερώθηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά την ενημέρωση του Υπουργείου. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

routes.put("/:id/minister", async (req, res, next) => {
  try {
    let result = await database.minister
      .update(
        { name: req.body.name, role: req.body.role, responsibility: req.body.responsibility, ministryId: req.body.ministryId },
        { where: { id: req.params.id } }
      )
      .catch((err) => console.error(err));
    if (result) {
      res
        .statusCode(200)
        .send({ msg: "Τα στοιχεία του Υπουργού ενημερώθηκαν επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά την ενημέρωση του Υπουργού. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});


routes.delete("/:id/minister", async (req, res, next) => {
  try {
    let result = await database.minister
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

routes.delete("/:id", async (req, res, next) => {
  try {
    let result = await database.ministries
      .destroy({ where: { id: req.params.id } })
      .catch((err) => console.error(err));
    if (result) {
      res.statusCode(200).send({ msg: "Το Υπουργείο διαγράφηκε επιτυχώς." });
    } else {
      res.statusCode(500).send({
        msg: "Προέκυψε πρόβλημα κατά τη διαγραφή του Υπουργείου. Παρακαλώ προσπαθήστε ξανά.",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = routes;
