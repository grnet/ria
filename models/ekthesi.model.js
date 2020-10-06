'use strict';
const { ekthesi } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var ekthesi = sequelize.define('ekthesi', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        author_id: DataTypes.STRING,
        title: DataTypes.STRING,

        ekpedeusi_politismos:DataTypes.BOOLEAN,
        eksoteriki_politiki:DataTypes.BOOLEAN,
        forologiki_politiki:DataTypes.BOOLEAN,
        koinoniki_politiki:DataTypes.BOOLEAN,
        dimosia_dioikisi:DataTypes.BOOLEAN,
        anaptiksi:DataTypes.BOOLEAN,

        field_1: DataTypes.STRING,
        field_2: DataTypes.STRING,
        field_3: DataTypes.STRING,
        field_4:DataTypes.BOOLEAN,
        field_4_comments: DataTypes.STRING,
        field_5_1: DataTypes.STRING,
        field_5_2: DataTypes.STRING,
        field_5_3: DataTypes.STRING,
        field_6: DataTypes.BOOLEAN,
        field_6_1: DataTypes.STRING,
        field_6_2: DataTypes.STRING,
        field_6_3: DataTypes.STRING,

        field_7_goal_1: DataTypes.BOOLEAN,
        field_7_goal_2: DataTypes.BOOLEAN,
        field_7_goal_3: DataTypes.BOOLEAN,
        field_7_goal_4: DataTypes.BOOLEAN,
        field_7_goal_5: DataTypes.BOOLEAN,
        field_7_goal_6: DataTypes.BOOLEAN,
        field_7_goal_7: DataTypes.BOOLEAN,
        field_7_goal_8: DataTypes.BOOLEAN,
        field_7_goal_9: DataTypes.BOOLEAN,
        field_7_goal_10: DataTypes.BOOLEAN,
        field_7_goal_11: DataTypes.BOOLEAN,
        field_7_goal_12: DataTypes.BOOLEAN,
        field_7_goal_13: DataTypes.BOOLEAN,
        field_7_goal_14: DataTypes.BOOLEAN,
        field_7_goal_15: DataTypes.BOOLEAN,
        field_7_goal_16: DataTypes.BOOLEAN,
        field_7_goal_17: DataTypes.BOOLEAN,

        field_8_1: DataTypes.STRING,
        field_8_2: DataTypes.STRING,
        field_10_amesi: DataTypes.BOOLEAN,
        field_10_amesi_comments: DataTypes.STRING,

        field_10_emmesi: DataTypes.BOOLEAN,
        field_10_emmesi_comments: DataTypes.STRING,
        field_11: DataTypes.BOOLEAN,
        field_11_comments: DataTypes.STRING,

        field_12: DataTypes.BOOLEAN,
        field_12_comments: DataTypes.STRING,

        field_13: DataTypes.BOOLEAN,
        field_13_comments: DataTypes.STRING,
        //ekthesis sintagmatos
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

        field_21_comments: DataTypes.STRING,
        field_22_sinergasia_ypoyrgeiwn: DataTypes.TEXT,
        field_22_sinergasia_forewn_arxwn: DataTypes.TEXT,
        field_22_diethnis_diavouleusi: DataTypes.TEXT,
        field_23__epi_arxis_comments: DataTypes.TEXT,
        field_23__epi_arthrwn_comments: DataTypes.TEXT,

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

        field_33: DataTypes.TEXT,
        field_34: DataTypes.TEXT,
        field_35: DataTypes.TEXT,
        field_36: DataTypes.TEXT,
        field_36: DataTypes.BOOLEAN,
        field_37: DataTypes.TEXT,
        field_38: DataTypes.TEXT,
        field_39: DataTypes.TEXT,
        field_40: DataTypes.TEXT,
                
    },{
        freezeTableName: true //table name same as model name
    });

    return ekthesi;
  };