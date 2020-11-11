'use strict';

module.exports = (sequelize, DataTypes) => {
    var field_9 = sequelize.define('field_9', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //ergasiakes_sxeseis_table
        symvaseis: DataTypes.JSON,
        sse_diamesolavisi: DataTypes.JSON,
        sse_diaitisia: DataTypes.JSON,
        mesos_xronos_mesolavisis: DataTypes.JSON,
        mesos_xronos_diaitisias: DataTypes.JSON,
        diarkeia_sse: DataTypes.JSON,
        wres_ergasias: DataTypes.JSON,
        ameivomenes_yperwries: DataTypes.JSON,
        atyximata: DataTypes.JSON,

        //apasxolisi_table
        anergia: DataTypes.JSON,
        makroxronia_anergoi: DataTypes.JSON,
        anergia_newn: DataTypes.JSON,
        anergia_gynaikwn: DataTypes.JSON,
        anergia_ana_perifereia: DataTypes.JSON,
        anergia_morfwsi: DataTypes.JSON,
        deiktis_apasxolisis: DataTypes.JSON,
        meriki_apasxolisi: DataTypes.JSON,
        symvasi_orismenoy_xronoy: DataTypes.JSON,

        //koinwniki_asfalisi_table
        ypsos_syntaksewn: DataTypes.JSON,
        ypsos_eisforwn: DataTypes.JSON,
        ilikia_syntaksiodotisis: DataTypes.JSON,
        aponomi_syntaksis: DataTypes.JSON,
        syntaksiodotiki_dapani: DataTypes.JSON,
        prosfyges_syntaksis: DataTypes.JSON,
       
        //koinwniki_pronoia_table
        kathestws_ftwxeias: DataTypes.JSON,
        sterisi_vasikwn_agathwn: DataTypes.JSON,
        noikokyria_ektaktes_anagkes: DataTypes.JSON,
        epidomata_dapani: DataTypes.JSON,
        paidia_se_orfanotrofeia: DataTypes.JSON,
        astegoi_sitisi: DataTypes.JSON,
        proswrini_katoikia: DataTypes.JSON,
        kostos_frontidas: DataTypes.JSON,
       
        //ygeia_table
        astheneis: DataTypes.JSON,
        paidiki_thnisimotita: DataTypes.JSON,
        dapanes_ygeias: DataTypes.JSON,
        dapanes_farmakwn: DataTypes.JSON,
        arithmos_iatrwn_ana_1000_katoikous: DataTypes.JSON,
        arithmos_klinwn_ana_1000_katoikous: DataTypes.JSON,
        diarkeia_epeigousas_nosileias: DataTypes.JSON,
        eidikes_nosileutikes_ypiresies: DataTypes.JSON,
        anamoni_asthenwn: DataTypes.JSON,
        arithmos_nosileiwn_ana_1000_katoikous: DataTypes.JSON,
        arithmos_klinwn_ana_ypiresia: DataTypes.JSON,

        //isotita_fylwn_table
        apasxolisi_fylwn_synolika: DataTypes.JSON,
        apasxolisi_fylwn_perifereia: DataTypes.JSON,
        apasxolisi_fylwn_oikonomia: DataTypes.JSON,
        apasxolisi_fylwn_ilikia: DataTypes.JSON,
        anergia_fylwn_synolika: DataTypes.JSON,
        anergia_fylwn_perifereia: DataTypes.JSON,
        anergia_fylwn_oikonomia: DataTypes.JSON,
        anergia_fylwn_ilikia: DataTypes.JSON,
        autoapasxoloymenoi_fylo: DataTypes.JSON,
        ergodotes_fylo: DataTypes.JSON,
        ds_fylo: DataTypes.JSON,
        symvoulia_fylo: DataTypes.JSON,

        //metanasteytiki_prosfygiki_politiki
        aitimata_asyloy: DataTypes.JSON,
        metanasteytikes_roes: DataTypes.JSON,
        apelaseis: DataTypes.JSON,
        monades_filoksenias: DataTypes.JSON,
        filoksenia_paravatikotita: DataTypes.JSON,    

        //dimosia_dioikisi_table
        dimosioi_ypalliloi: DataTypes.JSON,
        monimoi_metaklitoi: DataTypes.JSON,
        analogia_ypallilwn: DataTypes.JSON,
        prosvasi_internet: DataTypes.JSON,
        intranet: DataTypes.JSON,
        analogia_ypologistwn: DataTypes.JSON,
        istoselides: DataTypes.JSON,
        kentra_pliroforisis: DataTypes.JSON,
        eksypiretisi_ypiresies: DataTypes.JSON,
        kostos_proswpikou: DataTypes.JSON,
        kostos_diaxirisis_proswpikou: DataTypes.JSON,
        
        //dimosia_asfaleia_table
        drastes_adikimata: DataTypes.JSON,
        adikimata_poinikoy_kwdika: DataTypes.JSON,
        diapraxthenta_adikimata: DataTypes.JSON,
        etisia_statistika: DataTypes.JSON,
        adikimata_paranomi_eisodos: DataTypes.JSON,
        syxnotita_egklimatwn: DataTypes.JSON,
        eksixniasmena_egklimata: DataTypes.JSON,
        enallaktiki_epilysi_diaforwn: DataTypes.JSON,
        ergazomenoi_asfaleia: DataTypes.JSON,
        katoikoi_ana_astynomiko: DataTypes.JSON,
        analogia_astynomikwn_ana_1000_katoikoys: DataTypes.JSON,
        dapanes_astynomias: DataTypes.JSON,
        poines_se_xrima: DataTypes.JSON,
        poroi_antimetwpisis: DataTypes.JSON,

        //dikaiosini_table
        arithmos_diaforwn: DataTypes.JSON,
        dioikitikes_periptwseis: DataTypes.JSON,
        xronos_epilysis_ypothesewn: DataTypes.JSON,
        ekdosi_apofasewn: DataTypes.JSON,
        mo_ypotheswn_dikasti: DataTypes.JSON,
        akyrwsi_apofasewn: DataTypes.JSON,
        ekswdikastikos_symvivasmos: DataTypes.JSON,
        enallaktiki_epilysi_diaforwn: DataTypes.JSON,
        nomiki_prostasia: DataTypes.JSON,
        kostos_prosfygis: DataTypes.JSON,
        ilektroniki_ypovoli_dikografwn: DataTypes.JSON,
        diekperaiwsi_ypothesewn: DataTypes.JSON,
        poines_se_xrima: DataTypes.JSON,
        kostos_swfronismou: DataTypes.JSON,
        analogia_fylakwn_kratoumenwn: DataTypes.JSON,

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
