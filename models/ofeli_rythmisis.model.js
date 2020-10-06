const {ofeli_rythmisis } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var ofeli_rythmisis = sequelize.define('ofeli_rythmisis', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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
    }, {   
        freezeTableName: true //table name same as model name
    });
    return ofeli_rythmisis;
}
