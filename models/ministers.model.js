'use strict';

module.exports = (sequelize, DataTypes) => {
    var ministers = sequelize.define('ministers', {
        orgID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orgName: DataTypes.STRING, 
        orgDirector: DataTypes.STRING,
        orgType: DataTypes.STRING,
        responsibility: DataTypes.STRING,
        parentID: DataTypes.STRING,
        isCurrent: DataTypes.BOOLEAN
  
    },{
        freezeTableName: true //table name same as model name
    });

    return ministers;
  };