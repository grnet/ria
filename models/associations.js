'use strict';

//const { ekthesi, rythmiseis, field_9  } = require("../services/database"); if assocs not working uncommment

function applyAssoc(sequelize) {
	const { ekthesi, rythmiseis, field_9 } = sequelize.models;

	//establishing one to one association between ekthesi and rythmiseis
	ekthesi.hasOne(rythmiseis, {
		sourceKey: 'id',
		foreignKey: 'rythmisiId'});
		rythmiseis.belongsTo(ekthesi, { foreignKey: 'rythmisiId', targetKey: 'id' });

	//establishing one to one association between ekthesi and field_9 models
	ekthesi.hasOne(field_9, {
		sourceKey: 'id',
		foreignKey: 'field9Id'});
		field_9.belongsTo(ekthesi, { foreignKey: 'field9Id', targetKey: 'id' });
}

module.exports = { applyAssoc };