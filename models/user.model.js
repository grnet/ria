"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taxId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      isAdmin: DataTypes.STRING,
      agency: DataTypes.STRING,
    },
    {
      freezeTableName: true, //table name same as model name
    }
  );
  return user;
};
