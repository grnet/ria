const { Sequelize, Model, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.aitiologiki_ekthesi = require("../models/aitiologiki_ekthesi.model.js")(sequelize, Sequelize);

module.exports = db;