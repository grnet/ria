module.exports = (sequelize, DataTypes) => {
    var aitiologiki_ekthesi = sequelize.define('aitiologiki_ekthesi', {
        author_id: DataTypes.STRING,
        title: DataTypes.STRING,
        field_1: DataTypes.STRING,
        field_2: DataTypes.STRING,
        field_3: DataTypes.STRING,
        field_4:DataTypes.BOOLEAN,
        field_4_comments: DataTypes.STRING,
        field_5_1: DataTypes.STRING,
        field_5_2: DataTypes.STRING,
        field_5_3: DataTypes.STRING,
        field_6: DataTypes.BOOLEAN,
        field_6_1: DataTypes.STRING,
        field_6_2: DataTypes.STRING,
        field_6_3: DataTypes.STRING,
        field_8_1: DataTypes.STRING,
        field_8_2: DataTypes.STRING,
        field_10_amesi: DataTypes.BOOLEAN,
        field_10_amesi_comments: DataTypes.STRING,

        field_10_emmesi: DataTypes.BOOLEAN,
        field_10_emmesi_comments: DataTypes.STRING,
        field_11: DataTypes.BOOLEAN,
        field_11_comments: DataTypes.STRING,

        field_12: DataTypes.BOOLEAN,
        field_12_comments: DataTypes.STRING,

        field_13: DataTypes.BOOLEAN,
        field_13_comments: DataTypes.STRING,
    });
  
    return aitiologiki_ekthesi;
  };