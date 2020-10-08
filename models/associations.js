'use strict';

const { ekthesi, ofeli_rythmisis } = require("../services/database");

//const { ekthesis_arthrwn_sintagmatos } = require("../services/database");

function applyAssoc(sequelize) {
	const { ekthesi, ofeli_rythmisis} = sequelize.models;

	//establishing one to one association between ekthesi and ofeli_rythmisis
	/*ekthesi.hasOne(ofeli_rythmisis);
	ofeli_rythmisis.belongsTo(ekthesi);*/

	//establishing one to one association between ekthesi and ofeli_rythmisis
	ekthesi.hasOne(ofeli_rythmisis, {
		sourceKey: 'id',
		foreignKey: 'rythmisiId'});
	ofeli_rythmisis.belongsTo(ekthesi, { foreignKey: 'rythmisiId', targetKey: 'id' });
}

module.exports = { applyAssoc };