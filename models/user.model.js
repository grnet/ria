'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {

        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        username:{
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },    
        password: DataTypes.STRING,
        rolos: DataTypes.STRING,
        dikaiwmata_diaxeirisis: DataTypes.STRING,
        ypoyrgeio: DataTypes.STRING,        
    },
     {   
     freezeTableName: true //table name same as model name
    }
    );
    return user;
}
