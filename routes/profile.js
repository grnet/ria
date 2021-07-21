const routes = require('express').Router();
const { authUser } = require('../middleware/auth');
let database = require("../services/database");
const bcrypt = require('bcrypt');


routes.get('/', authUser, async function (req, res, next) {

    let user = await database.user.findOne({
        where: {
            username: req.session.username
        }
    })
    if (user && user.dataValues) {
        res.render("user_views/profile", { user: user.dataValues })
    } else {
        res.status(404).send("Not found")
    }
});

routes.put('/:username', authUser, async function (req, res, next) {
    req.session.errors = [];
    // let user = await database.user.update( req.body,{where:{
    //     username: req.session.username
    // }, returning: true, plain: true});   

    let user = await database.user.findOne({
        where: {
            username: req.params.username
        }
    });
    if (user && user.dataValues) {

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result) {
                if (req.body.new_password === req.body.password_repeat) {
                    bcrypt.hash(req.body.new_password, 10, async function (err, hash) {
                        if (hash) {
                            if (user.dikaiwmata_diaxeirisis && req.body.dikaiwmata_diaxeirisis) {
                                await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, password: hash, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio },
                                    {
                                        where: {
                                            username: req.params.username
                                        }
                                });
                                res.send({ redirect: "./admin_dashboard" });
                            } else {
                                await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, password: hash, rolos: req.body.rolos, dikaiwmata_diaxeirisis:'' , ypoyrgeio: req.body.ypoyrgeio },
                                    {
                                        where: {
                                            username: req.params.username
                                        }
                                });
                                res.send({ redirect: "./user_dashboard" });
                            }
                        }
                    });
                } else {
                    req.session.errors.push({ msg: 'Οι νέοι κωδικοί δεν ταιριάζουν.' })//custom error message
                    const errors = req.session.errors
                    if (errors) { // if array exists
                        console.log(errors);
                        return res.status(422).json(errors);
                    }
                }
            } else {
                req.session.errors.push({ msg: 'Εισάγατε λάθος κωδικό πρόσβασης.' });
                res.send(req.session.errors);
            }
        });
    } else {
        req.session.errors.push({ msg: 'Εισάγατε λανθασμένα στοιχεία.' })
        return res.send(req.session.errors);
    }
});

module.exports = routes;
