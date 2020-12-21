const { Sequelize, Model, DataTypes } = require('sequelize');
const { applyAssoc } = require('../models/associations.js');
const csv = require('csv-parser')
const fs = require('fs');

//create a .sqlite file for database
//const sequelize = new Sequelize('sqlite::memory:');
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite'
//   })

//read csv
// let results = [];
// getCreds((results) => { 
//     console.log('cb results: ' + results); 
//     const sequelize = new Sequelize({ database:results[0].value, username:results[1].value, password:results[2].value, dialect: 'mysql', host:results[4].value, port:results[5].value });   
//     console.log(sequelize);
// } )
// console.log('final results: ' + results)

// //connect to db 
// const sequelize = new Sequelize({ database: results, username: results, password: results, dialect: 'mysql', host: results, port: results });
//const sequelize = new Sequelize({ database:results[0].value, username:results[1].value, password:results[2].value, dialect: 'mysql', host:results[4].value, port:results[5].value });
const sequelize = new Sequelize({ database: 'riadbtest', username: 'riaapp', password: 'GH!ojid63EE', dialect: 'mysql', host: '83.212.76.128', port: 2306 });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//models
db.ekthesi = require("../models/ekthesi.model.js")(sequelize, Sequelize);
db.rythmiseis = require("../models/rythmiseis.model.js")(sequelize, Sequelize);
db.field_9 = require("../models/field_9.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

applyAssoc(sequelize);

module.exports = db;

function getCreds(cb) {
    let results = [];
    fs.createReadStream('/home/mariosven/Desktop/dbcredentials.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log('results: ' + Object.keys(results))
            cb(results); // call the callback with `results` as an argument
        })
}

//read csv
// const results = [];
// fs.createReadStream('/home/mariosven/Desktop/dbcredentials.csv')
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', async () => {
//         console.log('results: ' + Object.keys(results))
//         console.log('results: ' + results)

//         //connect to db 
//         //const sequelize = new Sequelize({ database: results, username: results, password: results, dialect: 'mysql', host: results, port: results });
//         const sequelize = new Sequelize({ database:results[0].value, username:results[1].value, password:results[2].value, dialect: 'mysql', host:results[4].value, port:results[5].value });
//         const db = {};

//         db.Sequelize = Sequelize;
//         db.sequelize = sequelize;
//         //models
//         db.ekthesi = require("../models/ekthesi.model.js")(sequelize, Sequelize);
//         db.rythmiseis = require("../models/rythmiseis.model.js")(sequelize, Sequelize);
//         db.field_9 = require("../models/field_9.model.js")(sequelize, Sequelize);
//         db.user = require("../models/user.model.js")(sequelize, Sequelize);

//         applyAssoc(sequelize);
//         sequelize.sync();

//         module.exports = db;


//     });

