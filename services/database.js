const { Sequelize } = require("sequelize");
const { applyAssoc } = require("../models/associations.js");

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  pool: { max: 100, min: 0, acquire: 30000, idle: 10000 },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//models
db.analysis = require("../models/analysis.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.audit = require("../models/audit.model.js")(sequelize, Sequelize);
db.ministries = require("../models/ministries.model.js")(sequelize, Sequelize);
db.minister = require("../models/minister.model.js")(sequelize, Sequelize);
db.indexes = require("../models/indexes.model.js")(sequelize, Sequelize);
db.index_tables = require("../models/index_tables.model.js")(
  sequelize,
  Sequelize
);

applyAssoc(sequelize);

module.exports = db;
