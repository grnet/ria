const {user } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {

        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        username:{
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },    
        password: DataTypes.STRING,
        rolos: DataTypes.BOOLEAN,
        dikaiwmata_diaxeirisis: DataTypes.BOOLEAN,
        ypoyrgeio: DataTypes.STRING,
        isLoggedIn: DataTypes.BOOLEAN,
        
    }, {   
        freezeTableName: true //table name same as model name
    });
    return user;
}
