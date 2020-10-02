const {article } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var article = sequelize.define('article', {
        article: DataTypes.STRING,
        text: DataTypes.STRING,
    });
    return article;
}
