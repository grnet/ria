const routes = require('express').Router();
let database = require('../services/database');
const bcrypt = require('bcrypt');
const { body, check, validationResult } = require('express-validator');


routes.get('/:username', async (req, res, next) => {

    let user = await database.user.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user && user.dataValues) {
        res.render("user_views/edit_user", { data: user.dataValues });
        console.log(user.dataValues);
    } else {
        res.status(404).send("Not found");
    }
});

routes.delete('/:username', async (req, res, next) => {

    let user = await database.user.findOne({ where: { username: req.params.username } })

    if (!user) {
        console.log("Error deleting user");
        res.status(404).send("Error while deleting user");
    } else {
        user.destroy();
        res.send({ redirect: "../search_user" });
    }
});


routes.put('/:username', async (req, res, next) => {

    const userPassword = req.body.password;
    const newPassword = req.body.new_password;
    let user = await database.user.findOne({//find a user with matching username & password
        where: {
            username: req.body.username,//find potential user bu username
        }
    })
    if (userPassword === null || userPassword === '' ) {
        user = await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio }, {
            where: {
                username: req.params.username
            }, returning: true, plain: true
        });
        console.log(user.password);
        if (!user) {
            // console.log("Error updating user.");
            // res.sendStatus.send(404);
            res.status(404).send("Error while updating user");
        } else {
            res.send({ redirect: "../search_user" });
        }
    }
    else {        
        bcrypt.hash(userPassword, 10, async function (err, hash) {
            //add row to user model, map values from req.body
            if (hash) {
                bcrypt.compare(hash, user.password, function (err, result) {//check if user entered correct password 
                    if (result == true) {
                        bcrypt.hash(newPassword, 10, async function (err, newHash) {//if correct, has new password and update user
                            if (newHash) {
                                user = await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, password: newHash, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio }, {
                                    where: {
                                        username: req.params.username
                                    }, returning: true, plain: true
                                });
                                console.log(user.password);
                                if (!user) {
                                    // console.log("Error updating user.");
                                    // res.sendStatus.send(404);
                                    res.status(404).send("Error while updating user");
                                } else {
                                    res.send({ redirect: "../search_user" });
                                }
                            }
                        })

                    }
                })
            } else {
                console.log(err);
            }
        })

    }
});

module.exports = routes;