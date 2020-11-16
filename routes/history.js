const routes = require('express').Router()
let database = require('../services/database')
const { Op } = require("sequelize");

routes.get('/', async function (req, res, next) {
    console.log(req.session.username)
    let user = await database.user.findOne({
        where: {
            username: req.session.username
        }, include: [{ model: database.ekthesi }]
    });
    let entries, status;
    //console.log( user);
    if (user && user.dataValues) {
        users = await database.user.findAll({
            where: {
                ypoyrgeio: user.ypoyrgeio
            }, include: [{ model: database.ekthesi }]
        })
        //for each different role we render different results
        if (user.rolos == "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων") {
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: {
                        [Op.or]: ["Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους", "Επιμελημένη", "Ολοκληρώθηκε"]
                    }//,
                    //[user.rolos]: {[Op.not]: ['Βουλευτής']}
                }, include: [{ model: database.user }]
            })
        } else if (user.rolos == "Συντάκτης επισπεύδοντος Υπουργείου") {
            status = "Σε σύνταξη";
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: status
                }, include: [{ model: database.user }]
            })
        } else if (user.rolos == "Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)" || user.rolos =="Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)" || user.rolos =="Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)" || user.rolos =="Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων") {
            status = "Οριστικοποιήθηκε"
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: status
                    
                }, include: [{ model: database.user }]
            })
        } else if (user.rolos == "Γενικό Λογιστήριο του Κράτους") {
            status = "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: status
                    
                }, include: [{ model: database.user }]
            })
        } else if (user.rolos == "Βουλή") {
            status = "Προς Δημοσίευση"
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: status
                    
                }, include: [{ model: database.user }]
            })
        } 
        res.render("user_views/history", { entries: entries, user: user, users:users, status:status });
    } else {
        res.status(404).send("Not found")
    }
});

module.exports = routes;
