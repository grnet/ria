"use strict";

function applyAssoc(sequelize) {
  const { analysis, user, audit, ministries, minister } = sequelize.models;

  //establishing one to many association between user and analysis models
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

  //establishing one to many association between analysis and audit models
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

  //establishing one to many association between ministers and ministries models
  ministries.hasMany(minister, {
    sourceKey: "id",
    foreignKey: "ministryId",
    foreignKeyConstraint: true,
  });
  minister.belongsTo(ministries, {
    foreignKey: "ministryId",
    targetKey: "id",
    foreignKeyConstraint: true,
  });
}

module.exports = { applyAssoc };
