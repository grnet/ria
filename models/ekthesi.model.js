'use strict';

module.exports = (sequelize, DataTypes) => {
    var ekthesi = sequelize.define(
      "ekthesi",
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        //author_id: DataTypes.STRING,
        nomosxedio: DataTypes.JSON,
        typos_analysis: DataTypes.STRING,
        title: DataTypes.STRING,
        initial_submit: DataTypes.STRING,
        last_updated: DataTypes.STRING,
        epispeudon_foreas: DataTypes.STRING,
        status_ekthesis: DataTypes.STRING,
        rythmisi_pou_afora: DataTypes.STRING,
        stoixeia_epikoinwnias: DataTypes.TEXT,

        ekpedeusi_politismos: DataTypes.STRING,
        eksoteriki_politiki: DataTypes.STRING,
        forologiki_politiki: DataTypes.STRING,
        koinoniki_politiki: DataTypes.STRING,
        dimosia_dioikisi: DataTypes.STRING,
        anaptiksi: DataTypes.STRING,

        field_1: DataTypes.TEXT,
        field_2: DataTypes.TEXT,
        field_3: DataTypes.TEXT,
        field_4: DataTypes.STRING,
        field_4_comments: DataTypes.TEXT,
        field_5_1: DataTypes.TEXT,
        field_5_2: DataTypes.TEXT,
        field_5_3: DataTypes.TEXT,
        field_6: DataTypes.STRING,
        field_6_1: DataTypes.TEXT,
        field_6_2: DataTypes.TEXT,
        field_6_3: DataTypes.TEXT,

        field_7_goal_1: DataTypes.STRING,
        field_7_goal_2: DataTypes.STRING,
        field_7_goal_3: DataTypes.STRING,
        field_7_goal_4: DataTypes.STRING,
        field_7_goal_5: DataTypes.STRING,
        field_7_goal_6: DataTypes.STRING,
        field_7_goal_7: DataTypes.STRING,
        field_7_goal_8: DataTypes.STRING,
        field_7_goal_9: DataTypes.STRING,
        field_7_goal_10: DataTypes.STRING,
        field_7_goal_11: DataTypes.STRING,
        field_7_goal_12: DataTypes.STRING,
        field_7_goal_13: DataTypes.STRING,
        field_7_goal_14: DataTypes.STRING,
        field_7_goal_15: DataTypes.STRING,
        field_7_goal_16: DataTypes.STRING,
        field_7_goal_17: DataTypes.STRING,

        field_8_1: DataTypes.TEXT,
        field_8_2: DataTypes.TEXT,
        field_10_amesi: DataTypes.STRING,
        field_10_amesi_comments: DataTypes.TEXT,

        field_10_emmesi: DataTypes.STRING,
        field_10_emmesi_comments: DataTypes.TEXT,
        field_11: DataTypes.STRING,
        field_11_comments: DataTypes.TEXT,

        field_12: DataTypes.STRING,
        field_12_comments: DataTypes.TEXT,

        field_13: DataTypes.STRING,
        field_13_comments: DataTypes.TEXT,
        field_14_arthro: DataTypes.JSON,
        field_14_stoxos: DataTypes.JSON,

        //ekthesis sintagmatos
        ekthesi_glk: DataTypes.STRING,
        field_15_ypoyrgeio: DataTypes.TEXT,
        field_15_sxedio_nomou: DataTypes.TEXT,
        field_15_rythmiseis: DataTypes.TEXT,

        field_16_kratikos_proypologismos: DataTypes.TEXT,
        field_16_proypologismos_forea: DataTypes.TEXT,
        field_16_genikos_onoma: DataTypes.TEXT,
        field_16_genikos_epitheto: DataTypes.TEXT,
        field_16_genikos_date: DataTypes.TEXT,
        signed_glk_pdf_upload: DataTypes.JSON,

        field_17_ypoyrgeio: DataTypes.TEXT,
        field_17_sxedio_nomou: DataTypes.TEXT,
        field_17_oikonomika_apotelesmata: DataTypes.TEXT,
        field_17_minister_name: DataTypes.JSON,
        field_17_minister_surname: DataTypes.JSON,
        field_17_minister_role: DataTypes.JSON,
        field_17_minister_ministry: DataTypes.JSON,

        field_18_comments: DataTypes.TEXT,
        field_19_comments: DataTypes.TEXT,
        field_20_comments: DataTypes.TEXT,

        field_21_upload: DataTypes.JSON,
        field_21_comments: DataTypes.TEXT,
        field_22_sinergasia_ypoyrgeiwn: DataTypes.TEXT,
        field_22_sinergasia_forewn_arxwn: DataTypes.TEXT,
        field_22_diethnis_diavouleusi: DataTypes.TEXT,
        field_23_arxes_symmetasxontes: DataTypes.TEXT,
        field_23_arxes_sxolia_yiothetithikan: DataTypes.TEXT,
        field_23_arxes_sxolia_den_yiothetithikan: DataTypes.TEXT,
        field_23_arthra_symmetasxontes: DataTypes.TEXT,
        field_23_arthra_sxolia_yiothetithikan: DataTypes.TEXT,
        field_23_arthra_sxolia_den_yiothetithikan: DataTypes.TEXT,
        field_23_upload: DataTypes.JSON,

        field_24: DataTypes.TEXT,
        field_25_dikaio: DataTypes.STRING,
        field_25_dikaio_comment: DataTypes.TEXT,
        field_25_kanonismos: DataTypes.STRING,
        field_25_kanonismos_comment: DataTypes.TEXT,
        field_25_odigia: DataTypes.STRING,
        field_25_odigia_comment: DataTypes.TEXT,
        field_25_apofasi: DataTypes.STRING,
        field_25_apofasi_comment: DataTypes.TEXT,

        field_26_antrwpina_dikaiwmata: DataTypes.STRING,
        field_26_antrwpina_dikaiwmata_comment: DataTypes.TEXT,
        field_26_symvaseis: DataTypes.STRING,
        field_26_symvaseis_comment: DataTypes.TEXT,

        field_27_dikastirio: DataTypes.STRING,
        field_27_dikastirio_comment: DataTypes.TEXT,
        field_27_arxi: DataTypes.STRING,
        field_27_arxi_comment: DataTypes.TEXT,

        field_28_nomologia: DataTypes.STRING,
        field_28_nomologia_comment: DataTypes.TEXT,
        field_28_nomologia_dikaiwmatwn_anthrwpou: DataTypes.STRING,
        field_28_nomologia_dikaiwmatwn_anthrwpou_comment: DataTypes.TEXT,
        field_28_alla_dikastiria: DataTypes.STRING,
        field_28_alla_dikastiria_comment: DataTypes.TEXT,

        field_29_diatakseis_rythmisis: DataTypes.JSON,
        field_29_yfistamenes_diatakseis: DataTypes.JSON,
        field_30_diatakseis_katargisi: DataTypes.JSON,
        field_30_katargoumenes_diatakseis: DataTypes.JSON,

        field_31_sxetiki_diataksi: DataTypes.JSON,
        field_31_synarmodia_ypoyrgeia: DataTypes.JSON,
        field_31_antikeimeno_synarmodiotitas: DataTypes.JSON,

        field_32_eksousiodotiki_diataksi: DataTypes.JSON,
        field_32_eidos_praksis: DataTypes.JSON,
        field_32_armodio_ypoyrgeio: DataTypes.JSON,
        field_32_antikeimeno: DataTypes.JSON,
        field_32_xronodiagramma: DataTypes.JSON,

        field_33: DataTypes.TEXT,
        field_34: DataTypes.TEXT,
        field_35: DataTypes.TEXT,
        field_36: DataTypes.TEXT,
        field_36: DataTypes.STRING,
        field_36_upload: DataTypes.JSON,
        field_37: DataTypes.TEXT,
        field_38: DataTypes.TEXT,
        field_39: DataTypes.TEXT,
        field_40: DataTypes.TEXT,
        
        emd_processes: DataTypes.JSON,

        minister_name: DataTypes.JSON,
        minister_surname: DataTypes.JSON,
        minister_role: DataTypes.JSON,
        minister_ministry: DataTypes.JSON,

        egkrisi_aksiologisis_nomoparaskeyastikis: DataTypes.STRING,
        egkrisi_kalis_nomothetisis: DataTypes.STRING,
        egkrisi_dieuthinsis_nomoparaskeyastikis: DataTypes.STRING,
        egkrisi_genikou_grammatea: DataTypes.STRING,

        signed_pdf_upload: DataTypes.JSON,
      },
      {
        freezeTableName: true, //table name same as model name
      }
    );

    return ekthesi;
  };