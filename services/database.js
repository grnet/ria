const { Sequelize, Model, DataTypes } = require('sequelize');
const { applyAssoc } = require('../models/associations.js');
const fs = require('fs');
const { parse } = require('path');

//read credentials from file
let dbCreds = fs.readFileSync('./db_creds.json');
dbCreds = JSON.parse(dbCreds)//fs returns string values

const sequelize = new Sequelize({ database: dbCreds.database, username: dbCreds.username, password: dbCreds.password, dialect: dbCreds.dialect, host: dbCreds.host, port: dbCreds.port });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//models
db.ekthesi = require("../models/ekthesi.model.js")(sequelize, Sequelize);
db.ekthesi_tables = require("../models/ekthesi_tables.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.audit = require("../models/audit.model.js")(sequelize, Sequelize);

applyAssoc(sequelize);

module.exports = db;

