'use strict';

const {rythmiseis } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var rythmiseis = sequelize.define('rythmiseis', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //table 18
        auksisi_esodwn: DataTypes.JSON,
        meiwsi_dapanwn: DataTypes.JSON,
        eksikonomisi_xronou: DataTypes.JSON,
        apodotikotita: DataTypes.JSON,
        amesa_allo: DataTypes.JSON,
        veltiwsi_ypiresiwn: DataTypes.JSON,
        metaxirisi_politwn: DataTypes.JSON,
        diafania_thesmwn: DataTypes.JSON,
        diaxirisi_kindynwn: DataTypes.JSON,
        emmesa_allo: DataTypes.JSON,

        //table19
        proetimasia: DataTypes.JSON,
        ypodomi: DataTypes.JSON,
        kinitikotita: DataTypes.JSON,
        emplekomenoi: DataTypes.JSON,
        efarmogi_allo: DataTypes.JSON,
        apodosi_diaxirisis: DataTypes.JSON,
        ektelesi: DataTypes.JSON,
        apodosi_kostos: DataTypes.JSON,
        apodosi_allo: DataTypes.JSON,

    }, {   
        freezeTableName: true //table name same as model name
    });
    return rythmiseis;
}
