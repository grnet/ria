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
      uploads: DataTypes.JSON,
      data: DataTypes.JSON,
      accountingData: DataTypes.JSON,
      accountingUploads: DataTypes.JSON,
    },
    {
      freezeTableName: true, //table name same as model name
    }
  );

  return analysis;
};
