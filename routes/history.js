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
    let entries;
    //console.log( user);
    if (user && user.dataValues) {
        //for each different role we render different results
        if (user.rolos == "Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων") {
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: {
                        [Op.or]: ["Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους", "Ολοκληρώθηκε"]
                    }
                }, include: [{ model: database.user }]
            })
            res.render("user_views/history", { entries: entries, user: user });

        } else if (user.rolos == "Συντάκτης επισπεύδοντος Υπουργείου") {
            entries = await database.ekthesi.findAll({
                where: {
                    status_ekthesis: "Σε σύνταξη"
                }, include: [{ model: database.user }]
            })
            users = await database.user.findAll({
                where: {
                    ypoyrgeio: user.ypoyrgeio
                }, include: [{ model: database.ekthesi }]
            })

            res.render("user_views/history", { entries: entries, user: user, users:users });
        }

        /*let per_role_entries = await database.user.findAll({
            where: {
                rolos: user.rolos
            }, include: [{ model: database.ekthesi }]
        });
        let status_query = "Εκκρεμεί η έκθεση Γενικού Λογιστηρίου του Κράτους"
        let status = await database.ekthesi.findAll({
            where: {
                status_ekthesis: status_query
            }, include: [{ model: database.user }]
        });
        let entries = await database.ekthesi.findAll({
            include: [{ model: database.user }]
        });
        //console.log("FOUND per_role_entries EKTHESIS: " + per_role_entries)
        res.render("user_views/history", { entries: entries, user: user, status: status, per_role_entries: per_role_entries })*/
    } else {
        res.status(404).send("Not found")
    }

    //console.log( entries)
    /*let user_entries = await database.ekthesi.findAll({where:{
        author: user.username
    }
    })*/


});

module.exports = routes;
