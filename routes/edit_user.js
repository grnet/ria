const routes = require('express').Router();
let database = require('../services/database');
const bcrypt = require('bcrypt');
const { body, check, validationResult } = require('express-validator');
const { authUser, authRole } = require('../middleware/auth');


routes.get('/:username', authUser, authRole, async (req, res, next) => {

    let entry = await database.user.findOne({
        where: {
            username: req.params.username
        }
    })
    if (entry && entry.dataValues) {
        const user = req.session.user;
        let latest_entry = await database.ministries.max('id').catch((error) => { console.log(error) }); // get entry with highest id 
        let res_data = await database.ministries.findOne({ where: { id: latest_entry } }).catch((error) => { console.log(error) });
        let ministries = [];
        for (i in res_data.dataValues.ministries) {
            let value = res_data.dataValues.ministries[i].ministry;
            if (value && String(value).trim()) { ministries.push({ ministry: value }) }
        }

        res.render("user_views/edit_user", { data: entry.dataValues, ministries: ministries, user:user });
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

    const password = req.body.password;
    const newPassword = req.body.new_password;
    const repeatPassword = req.body.password_repeat

    req.session.errors = [];
    let user = await database.user.findOne({
        where: {
            username: req.params.username
        }
    });
    if (user && user.dataValues) {
        if (!password) { //if password not provided update everything but the password
            await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio },
                {
                    where: {
                        username: req.params.username
                    }
                }).then(res.send({ redirect: "../search_user" }));
        }
        else {
            bcrypt.compare(password, user.password, function (err, result) {//compare user passwords
                if (result) {
                    if (newPassword === repeatPassword) {
                        bcrypt.hash(newPassword, 10, async function (err, hash) {
                            if (hash) {
                                await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, password: hash, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio },
                                    {
                                        where: {
                                            username: req.params.username
                                        }
                                    });
                                res.send({ redirect: "../search_user" });

                            }
                        });
                    } else {
                        req.session.errors.push({ msg: 'Οι κωδικοί δεν ταιριάζουν.' })//custom error message
                        const errors = req.session.errors
                        if (errors) {
                            return res.status(422).json(errors);
                        }
                    }
                } else {
                    req.session.errors.push({ msg: 'Εισαγάγατε λάθος κωδικό πρόσβασης.' });
                    res.send(req.session.errors);
                }
            });
        }

    } else {
        req.session.errors.push({ msg: 'Εισαγάγατε λανθασμένα στοιχεία.' })
        return res.send(req.session.errors);
    }

});

module.exports = routes;