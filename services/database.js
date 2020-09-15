const { Sequelize, Model, DataTypes } = require('sequelize');
const { applyAssoc } = require('../models/aitiologki_stoxoi_assoc.js');
//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.aitiologiki_ekthesi = require("../models/aitiologiki_ekthesi.model.js")(sequelize, Sequelize);
db.stoxoi_tomea_nomothetisis = require("../models/stoxoi_tomea_nomothetisis.model.js")(sequelize, Sequelize);
//db.article = require("../models/article.js")(sequelize, Sequelize);

applyAssoc(sequelize);

module.exports = db;