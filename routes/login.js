const routes = require('express').Router();
let database = require('../services/database');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

routes.get('/', async function (req, res, next) {
    /*let logoutuser = await database.user.findOne({where:{
        isLoggedIn: true
    }})
    if(logoutuser) {
        console.log(logoutuser)
        logoutuser.update({isLoggedIn: false})
        console.log(logoutuser)
        
    }   */
    //when logout api is implemented delete next rows
    req.session.username = null;
    req.session.fname = null;
    req.session.lname = null;
    req.session.dikaiwmata_diaxeirisis = null;
    req.session.rolos = null;
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
                    if (result == true) {
                        req.session.username = user.username;//store his data to session variables
                        req.session.fname = user.fname;
                        req.session.lname = user.lname;
                        user = user.fname + ' ' + user.lname;
                        console.log('user: '+user);
                        req.session.user = user;
                        console.log('sess user: '+user);
                        req.session.dikaiwmata_diaxeirisis = user.dikaiwmata_diaxeirisis;
                        req.session.rolos = user.rolos;
                        if (user.dikaiwmata_diaxeirisis) {
                            res.send({ redirect: "user_views/admin_dashboard" });//if user exists and has admin rights, redirect to admin dashboard
                        }
                        else {
                            res.send({ redirect: "user_views/user_dashboard" });
                        }
                        //  } else {
                        //  //res.send(err);
                        //  //res.redirect('/');
                        //  console.log(err);
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
        //console.log(req.sessionID)
        //console.log(req.session)

    });

module.exports = routes;