const { Sequelize, Model, DataTypes } = require('sequelize');
const { applyAssoc } = require('../models/associations.js');
//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.ekthesi = require("../models/ekthesi.model.js")(sequelize, Sequelize);
db.ofeli_rythmisis = require("../models/ofeli_rythmisis.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);


applyAssoc(sequelize);

module.exports = db;