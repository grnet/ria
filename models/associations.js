"use strict";

function applyAssoc(sequelize) {
  const { analysis, ekthesi_tables, user, audit } = sequelize.models;

  //establishing one to one association between ekthesi and ekthesi_tables models
  analysis.hasOne(ekthesi_tables, {
    sourceKey: "id",
    foreignKey: "ekthesi_tablesId",
    foreignKeyConstraint: true,
  });
  ekthesi_tables.belongsTo(analysis, {
    foreignKey: "ekthesi_tablesId",
    targetKey: "id",
    foreignKeyConstraint: true,
  });

  //establishing one to many association between user and ekthesi models
  user.hasMany(analysis, {
    sourceKey: "username",
    foreignKey: "author",
    foreignKeyConstraint: true,
  });
  analysis.belongsTo(user, {
    foreignKey: "author",
    targetKey: "username",
    foreignKeyConstraint: true,
  });

  //establishing one to many association between ekthesi and audit models
  analysis.hasMany(audit, {
    sourceKey: "id",
    foreignKey: "auditId",
    foreignKeyConstraint: true,
  });
  audit.belongsTo(analysis, {
    foreignKey: "auditId",
    targetKey: "id",
    foreignKeyConstraint: true,
  });
}

module.exports = { applyAssoc };
