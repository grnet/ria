"use strict";

function applyAssoc(sequelize) {
  const { analysis, user, audit, ministries, minister, index_tables, indexes } =
    sequelize.models;

  //establishing one to many association between user and analysis models
  user.hasMany(analysis, {
    sourceKey: "taxId",
    foreignKey: "author",
    foreignKeyConstraint: true,
  });
  analysis.belongsTo(user, {
    foreignKey: "author",
    targetKey: "taxId",
    foreignKeyConstraint: true,
  });

  //establishing one to many association between user and audit models
  user.hasMany(audit, {
    sourceKey: "taxId",
    foreignKey: "authorTaxId",
    foreignKeyConstraint: true,
  });
  audit.belongsTo(user, {
    foreignKey: "authorTaxId",
    targetKey: "taxId",
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

  //establishing one to many association between indexes and index_tables models
  index_tables.hasMany(indexes, {
    sourceKey: "id",
    foreignKey: "indexTableId",
    foreignKeyConstraint: true,
  });
  indexes.belongsTo(index_tables, {
    foreignKey: "indexTableId",
    targetKey: "id",
    foreignKeyConstraint: true,
  });
}

module.exports = { applyAssoc };
