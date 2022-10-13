const { Sequelize, Model, DataTypes } = require("sequelize");
const { applyAssoc } = require("../models/associations.js");
const fs = require("fs");

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  pool: { max: 40, min: 0, acquire: 30000, idle: 10000 },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//models
db.ekthesi = require("../models/ekthesi.model.js")(sequelize, Sequelize);
db.ekthesi_tables = require("../models/ekthesi_tables.model.js")(
  sequelize,
  Sequelize
);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.audit = require("../models/audit.model.js")(sequelize, Sequelize);
db.ministries = require("../models/ministries.model.js")(sequelize, Sequelize);

applyAssoc(sequelize);

module.exports = db;
