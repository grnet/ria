const {user } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        user_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        rolos: DataTypes.BOOLEAN,
        dikaiwmata_diaxeirisis: DataTypes.BOOLEAN,
        ypoyrgeio: DataTypes.STRING,
        
    }, {   
        freezeTableName: true //table name same as model name
    });
    return user;
}
