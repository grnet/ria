'use strict';
const { stoxoi_tomea_nomothetisis } = require("../services/database");
//creating and exporting model
module.exports = (sequelize, DataTypes) => {
    var stoxoi_tomea_nomothetisis = sequelize.define('stoxoi_tomea_nomothetisis', {

        
                
    },{
        freezeTableName: true //table name same as model name
    });

    return stoxoi_tomea_nomothetisis;
  };
