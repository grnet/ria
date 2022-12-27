"use strict";

module.exports = (sequelize, DataTypes) => {
  var analysis = sequelize.define(
    "analysis",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: DataTypes.STRING,
      status: DataTypes.STRING,
      // law_plan: DataTypes.JSON, // this and fields bellow are used to hold references to uploaded files
      // signed_accounting_office_pdf: DataTypes.JSON,
      uploads: DataTypes.JSON,
      data: DataTypes.JSON,
      // signed_pdf_uploads: DataTypes.JSON,
    },
    {
      freezeTableName: true, //table name same as model name
    }
  );

  return analysis;
};
