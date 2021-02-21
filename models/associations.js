'use strict';

//const { ekthesi, rythmiseis, field_9  } = require("../services/database"); if assocs not working uncommment

function applyAssoc(sequelize) {
	const { ekthesi, ekthesi_tables, user, audit } = sequelize.models;

	//establishing one to one association between ekthesi and ekthesi_tables models
	ekthesi.hasOne(ekthesi_tables, {
		sourceKey: 'id',
		foreignKey: 'ekthesi_tablesId',
		foreignKeyConstraint: true
	});
	ekthesi_tables.belongsTo(ekthesi, { foreignKey: 'ekthesi_tablesId', targetKey: 'id', foreignKeyConstraint: true });

	//establishing one to many association between user and ekthesi models
	user.hasMany(ekthesi, {
		sourceKey: 'username',
		foreignKey: 'author',
		foreignKeyConstraint: true
	});
	ekthesi.belongsTo(user, { foreignKey: 'author', targetKey: 'username', foreignKeyConstraint: true });

	//establishing one to many association between ekthesi and audit models	
	ekthesi.hasMany(audit, {
		sourceKey: 'id',
		foreignKey: 'auditId',
		foreignKeyConstraint: true
	});
	audit.belongsTo(ekthesi, { foreignKey: 'auditId', targetKey: 'id', foreignKeyConstraint: true });

}

module.exports = { applyAssoc };