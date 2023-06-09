const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.persons = require('./person.model.js')(mongoose);
db.foods = require('./alimento.model.js')(mongoose);
db.personFood = require('./persona_alimento.model.js')(mongoose);
db.banco = require('./banco.model.js')(mongoose);

module.exports = db