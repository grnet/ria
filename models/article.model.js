const {article } = require("../services/database");

module.exports = (sequelize, DataTypes) => {
    var article = sequelize.define('article', {
        article_id: DataTypes.STRING,
        text: DataTypes.STRING,
    });
    return article;
}
