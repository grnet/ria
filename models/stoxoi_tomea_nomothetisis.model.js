'use strict';
const { stoxoi_tomea_nomothetisis } = require("../services/database");
//creating and exporting model
module.exports = (sequelize, DataTypes) => {
    var stoxoi_tomea_nomothetisis = sequelize.define('stoxoi_tomea_nomothetisis', {

        anaskafes_year1: DataTypes.STRING,
        anaskafes_year2: DataTypes.STRING,
        anaskafes_year3: DataTypes.STRING,
        anaskafes_year4: DataTypes.STRING,
        anaskafes_year5: DataTypes.STRING,
        anaskafes_prosfata_stoixeia: DataTypes.STRING,
        anaskafes_epidiwkomenos_stoxos: DataTypes.STRING,
                
    },{
        freezeTableName: true //table name same as model name
    });

    return stoxoi_tomea_nomothetisis;
  };
