const routes = require('express').Router()
let database = require('../services/database')
const { Op } = require("sequelize");
const { authUser } = require('../middleware/auth');
const { analysis } = require('../services/database');

routes.get('/', authUser, async function (req, res, next) {
    let user = await database.user.findOne({
        where: {
            username: req.session.username
        }, include: [{ model: database.analysis }]
    });
    let entries, status;
    if (user && user.dataValues) {
        //TODO: use enums
        if (user.role == "Συντάκτης επισπεύδοντος Υπουργείου") {
            status = "Συντάσσεται";
            entries = await database.analysis.findAll({
              where: {
                status: status,
                "$user.agency$": user.agency, //has to be from same ministry
              },
              include: [{ model: database.user }],
              raw: true,
              nest: true,
            });
        } else if (user.role == "Γενικό Λογιστήριο του Κράτους") {
          status = "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους";
          entries = await database.analysis.findAll({
            where: {
              // [Op.and]: [
              // {
              status: {
                [Op.or]: [
                  "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους",
                  "Ελέγχθηκε από το Γενικό Λογιστήριο του Κράτους",
                ],
              },
              // },
              //    { ekthesi_glk: { [Op.ne]: [null || ""] } }
              // ]
            },
            include: [{ model: database.user }],
            raw: true,
            nest: true,
          });
        } else if (user.role == "Βουλή") {
          status = "Κατατέθηκε";
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
          // } else if (user.role == "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων") {
          //     entries = await database.analysis.findAll({
          //         where: {
          //             status_: {
          //                 [Op.or]: ["Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους", "Συντάσσεται", "Ολοκληρώθηκε"]
          //             }, '$user.role$': { [Op.not]: ['Βουλευτής'] }
          //         }, include: [{ model: database.user }], raw: true, nest: true
          //     })
        }
        res.render("user_views/history", { entries: entries, user: user });
    } else {
        res.status(404).send("Not found")
    }
});

// routes.delete('/', async (req, res ,next) => {
    
// })

module.exports = routes;
