const routes = require('express').Router();
let database = require('../services/database');
const bcrypt = require('bcrypt');
const { body, check, validationResult } = require('express-validator');
const { authUser, authRole } = require('../middleware/auth');


routes.get('/:username', authUser, authRole, async (req, res, next) => {

    let user = await database.user.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user && user.dataValues) {
        res.render("user_views/edit_user", { data: user.dataValues });
    } else {
        res.status(404).send("Not found");
    }
});

routes.delete('/:username', authUser, authRole, async (req, res, next) => {

    let user = await database.user.findOne({ where: { username: req.params.username } })

    if (!user) {
        res.status(404).send("Error while deleting user");
    } else {
        user.destroy();
        res.send({ redirect: "../search_user" });
    }
});


routes.put('/:username', authUser, authRole, async (req, res, next) => {

    const userPassword = req.body.password;
    const newPassword = req.body.new_password;

    bcrypt.hash(newPassword, 10, async function (err, newHash) {//if correct, has new password and update user
        if (newHash) {
            user = await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, password: newHash, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio }, {
                where: {
                    username: req.params.username
                }
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
});

module.exports = routes;