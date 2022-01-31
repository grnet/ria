'use strict';

module.exports = (sequelize, DataTypes) => {
    var ministries = sequelize.define('ministries', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ministries: DataTypes.JSON,
  
    },{
        freezeTableName: true //table name same as model name
    });

    return ministries;
  };