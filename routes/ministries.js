const { authRole, authUser } = require("../middleware/auth");
const routes = require("express").Router();
const { spawn } = require("child_process");
const database = require("../services/database");

routes.post("/", authUser, authRole, async (req, res, next) => {
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

module.exports = routes;
