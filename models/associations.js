'use strict';

const { ekthesi, ofeli_rythmisis } = require("../services/database");

//const { ekthesis_arthrwn_sintagmatos } = require("../services/database");

function applyAssoc(sequelize) {
	const { ekthesi, ofeli_rythmisis} = sequelize.models;
	//const { ekthesi, stoxoi_tomea_nomothetisis } = sequelize.models;
	//establishing one to many association between aitiologiki_ekthesi and stoxoi_tomea_nomothetisis
	//ekthesi.hasMany(stoxoi_tomea_nomothetisis);
	//stoxoi_tomea_nomothetisis.belongsTo(ekthesi);
	//establishing one to one association between aitiologiki_ekthesi and ekthesis_arthrwn_sintagmatos
	/*aitiologiki_ekthesi.hasOne(ekthesis_arthrwn_sintagmatos);
	ekthesis_arthrwn_sintagmatos.belongsTo(aitiologiki_ekthesi);*/

	//establishing one to one association between ekthesi and ofeli_rythmisis
	ekthesi.hasOne(ofeli_rythmisis, {
		sourceKey: 'id',
		foreignKey: 'rythmisiId'});
	ofeli_rythmisis.belongsTo(ekthesi, { foreignKey: 'rythmisiId', targetKey: 'id' });
}

module.exports = { applyAssoc };