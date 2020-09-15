'use strict';
const { stoxoi_tomea_fields } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var stoxoi_tomea_fields = sequelize.define('stoxoi_tomea_nomothetisis', {

        tomeasID:DataTypes.STRING,
        year1:DataTypes.STRING,
        year2:DataTypes.STRING,
        year3:DataTypes.STRING,
        year4:DataTypes.STRING,
        year5:DataTypes.STRING,
        prosfata_stoixeia:DataTypes.STRING,
        epidiokomenos_stoxos:DataTypes.STRING,
                
    },{
        freezeTableName: true //table name same as model name
    });

    return stoxoi_tomea_fields;
  };
