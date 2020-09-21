'use strict';
const { ekthesi_nomimotitas } = require("../services/database");
//creating and exporting model
module.exports = (sequelize, DataTypes) => {
    var ekthesi_nomimotitas = sequelize.define('ekthesi_nomimotitas', {

        field_24: DataTypes.TEXT,
        field_25_dikaio: DataTypes.BOOLEAN,
        field_25_dikaio_comment: DataTypes.TEXT,
        field_25_kanonismos: DataTypes.BOOLEAN,
        field_25_kanonismos_comment: DataTypes.TEXT,
        field_25_odigia: DataTypes.BOOLEAN,
        field_25_odigia_comment: DataTypes.TEXT,
        field_25_apofasi: DataTypes.BOOLEAN,
        field_25_apofasi_comment: DataTypes.TEXT,

        field_26_antrwpina_dikaiwmata: DataTypes.BOOLEAN,
        field_26_antrwpina_dikaiwmata_comment: DataTypes.TEXT,
        field_26_symvaseis: DataTypes.BOOLEAN,
        field_26_symvaseis_comment: DataTypes.TEXT,

        field_27_dikastirio:DataTypes.BOOLEAN,
        field_27_dikastirio_comment: DataTypes.TEXT,
        field_27_arxi: DataTypes.BOOLEAN,
        field_27_arxi_comment: DataTypes.TEXT,

        field_28_nomologia: DataTypes.BOOLEAN,
        field_28_nomologia_comment: DataTypes.TEXT,
        field_28_nomologia_dikaiwmatwn_anthrwpou: DataTypes.BOOLEAN,
        field_28_nomologia_dikaiwmatwn_anthrwpou_comment: DataTypes.TEXT,
        field_28_alla_dikastiria: DataTypes.BOOLEAN, 
        field_28_alla_dikastiria_comment: DataTypes.TEXT,
    },{
        freezeTableName: true //table name same as model name
    });

    return ekthesi_nomimotitas;
  };