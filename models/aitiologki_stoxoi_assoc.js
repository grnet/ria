'use strict';
//establishing one to many association between aitiologiki_ekthesi and stoxoi_tomea_nomothetisis
function applyAssoc(sequelize) {
	const { aitiologiki_ekthesi, stoxoi_tomea_nomothetisis } = sequelize.models;

	aitiologiki_ekthesi.hasMany(stoxoi_tomea_nomothetisis);
	stoxoi_tomea_nomothetisis.belongsTo(aitiologiki_ekthesi);
}

module.exports = { applyAssoc };