const routes = require('express').Router();
let database = require('../services/database');
const bcrypt = require('bcrypt');

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
    bcrypt.hash(userPassword, 10, async function(err, hash) {
        //add row to user model, map values from req.body
        if (hash) {
            console.log(hash);
            let user = await database.user.update({ fname: req.body.fname, lname: req.body.lname, username: req.body.username, password: hash, rolos: req.body.rolos, dikaiwmata_diaxeirisis: req.body.dikaiwmata_diaxeirisis, ypoyrgeio: req.body.ypoyrgeio }, {
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
        } else {
            console.log('error while hashing');
        }        
    })  
});

module.exports = routes;