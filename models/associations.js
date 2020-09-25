'use strict';

//const { ekthesis_arthrwn_sintagmatos } = require("../services/database");

function applyAssoc(sequelize) {
	//const { aitiologiki_ekthesi, stoxoi_tomea_nomothetisis, ekthesis_arthrwn_sintagmatos } = sequelize.models;
	const { aitiologiki_ekthesi, stoxoi_tomea_nomothetisis } = sequelize.models;
	//establishing one to many association between aitiologiki_ekthesi and stoxoi_tomea_nomothetisis
	aitiologiki_ekthesi.hasMany(stoxoi_tomea_nomothetisis);
	stoxoi_tomea_nomothetisis.belongsTo(aitiologiki_ekthesi);
	//establishing one to one association between aitiologiki_ekthesi and ekthesis_arthrwn_sintagmatos
	/*aitiologiki_ekthesi.hasOne(ekthesis_arthrwn_sintagmatos);
	ekthesis_arthrwn_sintagmatos.belongsTo(aitiologiki_ekthesi);*/
}

module.exports = { applyAssoc };