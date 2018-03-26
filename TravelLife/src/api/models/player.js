var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var player = new Schema(
{
	userId: {type: ObjectId, ref: "User"},
	createdDate: {type: Date, default: Date.now},
	modifiedDate: {type: Date, default: Date.now},
	name: {type: String, required: true},
	species: {type: String, required: true},
	status: {type: String, required: true},
	up: {type: Number, default: 0},
	left: {type: Number, default: 0},
	right: {type: Number, default: 0},
	down: {type: Number, default: 0},
	map: [String]
});

module.exports = mongoose.model("Player", player);
