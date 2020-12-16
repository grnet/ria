const { Sequelize, Model, DataTypes } = require('sequelize');
const { applyAssoc } = require('../models/associations.js');
//create a .sqlite file for database
//const sequelize = new Sequelize('sqlite::memory:');
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite'
//   })

//connect to db 
const sequelize = new Sequelize({ database:'riadbtest', username:'riaapp', password:'GH!ojid63EE', dialect: 'mysql', host:'83.212.76.128', port:'2306' });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//models
db.ekthesi = require("../models/ekthesi.model.js")(sequelize, Sequelize);
db.rythmiseis = require("../models/rythmiseis.model.js")(sequelize, Sequelize);
db.field_9 = require("../models/field_9.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

applyAssoc(sequelize);

module.exports = db;