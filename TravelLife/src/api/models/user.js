var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
	createdDate: {type: Date, default: Date.now},
	username: {type: String, required: true},
	password: {type: String, required: true}
});

module.exports = mongoose.model("User", user);
