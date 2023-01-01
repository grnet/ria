"use strict";

module.exports = (sequelize, DataTypes) => {
  var indexes = sequelize.define(
    "indexes",
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

  return indexes;
};
