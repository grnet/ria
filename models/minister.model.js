"use strict";

module.exports = (sequelize, DataTypes) => {
  var minister = sequelize.define(
    "minister",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      role: DataTypes.STRING,
      responsibility: DataTypes.STRING
    },
    {
      freezeTableName: true, //table name same as model name
    }
  );

  return minister;
};
