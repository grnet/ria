const routes = require('express').Router();
let database = require('../services/database');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

routes.get('/', async function (req, res, next) {
    const valid_errors = req.session.errors;
    req.session.errors = null;
    res.render("login", { errors: valid_errors })
});

routes.post('/', [
    // username must be an email
    check("username")
        .notEmpty().withMessage("Κενό όνομα χρήστη."),
    // password must be at least 5 chars long
    check("password")
        .isString().isLength({ min: 5 }).withMessage("Λανθασμένος κωδικός πρόσβασης.")
        .notEmpty().withMessage("Κενός κωδικός πρόσβασης.")
]

    , async function (req, res, next) {
        const errors = validationResult(req);
        req.session.errors = errors.array();
        if (errors.isEmpty()) {//no validation errors
            const userPassword = req.body.password;
            let user = await database.user.findOne({//find a user with matching username & password
                where: {
                    username: req.body.username,
                }
            })
            if (user && user.dataValues) {//found a user

                bcrypt.compare(userPassword, user.password, function (err, result) {
                    if (result) {
                        req.session.user = user;
                        req.session.username = user.username;//store data to session variables
                        req.session.fname = user.fname;
                        req.session.lname = user.lname;
                        req.session.dikaiwmata_diaxeirisis = user.dikaiwmata_diaxeirisis;
                        req.session.rolos = user.rolos;
                        user.dikaiwmata_diaxeirisis? res.send({ redirect: "user_views/admin_dashboard" }) : res.send({ redirect: "user_views/user_dashboard" });
                        // if (user.dikaiwmata_diaxeirisis) {
                        //     res.send({ redirect: "user_views/admin_dashboard" });//if user exists and has admin rights, redirect to admin dashboard
                        // }
                        // else {
                        //     res.send({ redirect: "user_views/user_dashboard" });
                        // }                        
                    } else {
                        req.session.errors.push({ msg: 'Δε βρέθηκε χρήστης με αυτό το όνομα ή κωδικό.' })//custom error message
                        res.send({ redirect: "./login" });//redirect and display errors
                    }
                })
            } else {
                req.session.errors.push({ msg: 'Δε βρέθηκε χρήστης με αυτό το όνομα ή κωδικό.' })//custom error message
                res.send({ redirect: "./login" });//redirect and display errors
            }
        } else {
            res.send({ redirect: "./login" });
        }

    });

module.exports = routes;