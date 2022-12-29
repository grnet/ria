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
            if (user && user.dataValues) {//found user

                bcrypt.compare(userPassword, user.password, function (err, result) {
                    if (result) {
                        req.session.user = user;
                        res.send({ redirect: "user_views/dashboard" });                       
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