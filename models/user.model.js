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
      afm: DataTypes.STRING,
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      username: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
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
