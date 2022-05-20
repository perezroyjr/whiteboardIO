const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: String,
	password: String
});

const User = module.exports = mongoose.model('User', userSchema); //export the schema as a module