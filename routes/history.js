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
          raw: true,
          nest: true,
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
          raw: true,
          nest: true,
        });
      } else if (user.role === Enums.Roles.Parliament) {
        status = Enums.Status.Uploaded;
        entries = await database.analysis.findAll({
          where: {
            status: status,
          },
          include: [{ model: database.user }],
          raw: true,
          nest: true,
        });
      } else {
        entries = await database.analysis.findAll({ include: database.user });
      }
      res.render("user_views/history", { entries: entries, user: user });
    } else {
      res.status(404).send("Not found");
    }
  }
);

module.exports = routes;
