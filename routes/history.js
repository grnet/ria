const routes = require('express').Router()
let database = require('../services/database')
const { Op } = require("sequelize");
const { authUser } = require('../controllers/auth');
const { ekthesi } = require('../services/database');

routes.get('/', authUser, async function (req, res, next) {
    console.time();
    let user = await database.user.findOne({
        where: {
            username: req.session.username
        }, include: [{ model: database.ekthesi }]
    });
    let entries, status;
    if (user && user.dataValues) {

        if (user.rolos == "Συντάκτης επισπεύδοντος Υπουργείου") {
            status = "Συντάσσεται";
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: status,
                    '$user.ypoyrgeio$': user.ypoyrgeio //has to be from same ministry
                }, include: [{ model: database.user }],
                raw: true, nest: true
            })
        } else if (user.rolos == "Γενικό Λογιστήριο του Κράτους") {
            status = "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
            entries = await database.ekthesi.findAll({
                where: {
                    [Op.or]: [
                        {
                            status_ekthesis: {
                                [Op.or]: ["Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους", "Ολοκληρώθηκε"],
                            },
                        },
                        { ekthesi_glk: { [Op.ne]: [null || ""] } }
                    ]
                }, include: [{ model: database.user }], raw: true, nest: true
            })
        } else if (user.rolos == "Βουλή") {
            status = "Κατατέθηκε"
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: status

                }, include: [{ model: database.user }], raw: true, nest: true
            })
        } else if (user.rolos == "Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)" || user.rolos == "Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)" || user.rolos == "Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)" || user.rolos == "Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων" || user.rolos == "Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)") {
            entries = await database.ekthesi.findAll({ include: database.user })
        } else if (user.rolos == "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων") {
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: {
                        [Op.or]: ["Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους", "Συντάσσεται", "Ολοκληρώθηκε"]
                    }, '$user.rolos$': { [Op.not]: ['Βουλευτής'] }
                }, include: [{ model: database.user }], raw: true, nest: true
            })
        }
        console.timeEnd();
        res.render("user_views/history", { entries: entries, user: user });
    } else {
        res.status(404).send("Not found")
    }
});

module.exports = routes;
