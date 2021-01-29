
module.exports = (sequelize, DataTypes) => {
    var audit = sequelize.define('audit', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user: DataTypes.STRING,
        data: DataTypes.JSON,
        timestamp: DataTypes.STRING,
        action: DataTypes.STRING,                

    }, {   
        freezeTableName: true //table name same as model name
    });
    return audit;
}
