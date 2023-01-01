"use strict";

module.exports = (sequelize, DataTypes) => {
  var index_tables = sequelize.define(
    "index_tables",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true, //table name same as model name
    }
  );

  return index_tables;
};
