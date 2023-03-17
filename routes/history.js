const routes = require("express").Router();
let database = require("../services/database");
const { Op } = require("sequelize");
const { authUser, authRole, authAgency } = require("../middleware/auth");
const Enums = require("../lib/enums/analysis");

routes.get(
  "/",
  authUser,
  authRole,
  authAgency,
  async function (req, res, next) {
    try {
      let user = await database.user.findOne({
        where: {
          taxId: req.session.user.taxId,
        },
        include: [{ model: database.analysis }],
      });
      let entries, status;
      if (user && user.dataValues) {
        if (user.role === Enums.Roles.Composer) {
          status = Enums.Status.Composing;
          entries = await database.analysis.findAll({
            where: {
              status: status,
              "$user.agency$": user.agency, //has to be from same agency
            },
            include: [{ model: database.user }],
          });
        } else if (user.role === Enums.Roles.GeneralAccountingOffice) {
          status = Enums.Status.Pending;
          entries = await database.analysis.findAll({
            where: {
              status: {
                [Op.or]: [Enums.Status.Pending, Enums.Status.Checked],
              },
            },
            include: [{ model: database.user }],
          });
        } else if (user.role === Enums.Roles.Parliament) {
          status = Enums.Status.Uploaded;
          entries = await database.analysis.findAll({
            where: {
              status: status,
            },
            include: [{ model: database.user }],
          });
        } else {
          entries = await database.analysis.findAll({ include: database.user });
        }
        const userEntries = [];
        for (i in entries) {
          let entry = await database.audit.findAll({
            limit: 1,
            where: {
              authorTaxId: user.taxId,
              auditId: entries[i].dataValues.id,
            },
            include: [{ model: database.user }],
            order: [["createdAt", "DESC"]],
          });
          userEntries.push(entry[0]);
        }
        const latestEntries = [];
        if (userEntries.length > 0) {
          for (i in userEntries) {
            if (userEntries[i] && "auditId" in userEntries[i]) {
              let firstAuditEntry = await database.audit.findAll({
                limit: 1,
                where: { auditId: userEntries[i].auditId },
                include: [{ model: database.user }],
              });
              let latestAuditEntry = await database.audit.findAll({
                limit: 1,
                where: { auditId: userEntries[i].auditId },
                order: [["createdAt", "DESC"]],
                include: [{ model: database.user }],
              });
              latestEntries.push({
                firstAuditEntry: firstAuditEntry[0].dataValues,
                userEntry: userEntries[i].dataValues,
                latestAuditEntry: latestAuditEntry[0].dataValues,
              });
            }
          }
        }
        res.render("user_views/history", {
          entries: entries,
          user: user,
          latestEntries: latestEntries,
        });
      } else {
        res.status(404).send("Not found");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = routes;
