'use strict';

module.exports = (sequelize, DataTypes) => {
    var field_9 = sequelize.define('field_9', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        //ependytiki_drastiriotita_table        
        pagkosmia_antagwnistikotita :DataTypes.JSON,
        ependyseis: DataTypes.JSON,
        ameses_ependyseis: DataTypes.JSON,
        nees_epixeiriseis: DataTypes.JSON,
        kleistes_epixeiriseis: DataTypes.JSON,
        dioikitiko_kostos: DataTypes.JSON,
        mx_systasis_epixeirisis: DataTypes.JSON,
        
        //perivallon_energeia_table
        atmosfairiki_rypansi: DataTypes.JSON,
        viologikoi_katharismoi: DataTypes.JSON,
        katallhles_aktes: DataTypes.JSON,
        katallilotita_diktyoy_ydreysis: DataTypes.JSON,
        xrisi_aporrimmatwn: DataTypes.JSON,
        aporrimmata_xyta: DataTypes.JSON,
        katastrofi_dasikwn_ektasewn: DataTypes.JSON,
        anadaswseis: DataTypes.JSON,
        prostateuomenes_perioxes: DataTypes.JSON,
        proypologismos_prostasias_perivallontos: DataTypes.JSON,
        katanalwsi_energeias_kata_kefali: DataTypes.JSON,
        katanalwsi_energeias_ana_morfi: DataTypes.JSON,
        katanalwsi_energeias_apo_ananewsimes_piges: DataTypes.JSON,
        meiwsi_ekpompwn_thermokipioy: DataTypes.JSON,

        //allos_deiktis tables
        allos_deiktis1: DataTypes.JSON,
        allos_deiktis2: DataTypes.JSON,
        allos_deiktis3: DataTypes.JSON,
        allos_deiktis4: DataTypes.JSON,
        allos_deiktis5: DataTypes.JSON,
        
    }, {   
        freezeTableName: true //table name same as model name
    });
    return field_9;
}
