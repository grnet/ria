'use strict';
const { ekthesis_arthrwn_sintagmatos } = require("../services/database");
//creating and exporting model
module.exports = (sequelize, DataTypes) => {
    var ekthesis_arthrwn_sintagmatos = sequelize.define('ekthesis_arthrwn_sintagmatos', {

        author_id: DataTypes.STRING,
        field_15_ypoyrgeio: DataTypes.STRING,
        field_15_sxedio_nomou: DataTypes.STRING,
        field_15_analysi: DataTypes.STRING,
        field_15_rythmiseis: DataTypes.STRING,

        field_16: DataTypes.STRING,
        field_16_kratikos_proypologismos: DataTypes.STRING,
        field_16_proypologismos_forea: DataTypes.STRING,

        field_17_ypoyrgeio: DataTypes.STRING,
        field_17_sxedio_nomou: DataTypes.STRING,
        field_17_oikonomika_apotelesmata: DataTypes.STRING,
                
    },{
        freezeTableName: true //table name same as model name
    });

    return ekthesis_arthrwn_sintagmatos;
  };