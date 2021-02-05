'use strict';

module.exports = (sequelize, DataTypes) => {
    var ekthesi_tables = sequelize.define('ekthesi_tables', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        static_tables: DataTypes.JSON,
        checkbox_tables:DataTypes.JSON        
    }, {   
        freezeTableName: true //table name same as model name
    });
    return ekthesi_tables;
}
