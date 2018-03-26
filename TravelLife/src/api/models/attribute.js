var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var attribute = new Schema(
{
	playerId: {type: ObjectId, ref: "Player"},
	name: {type: String, required: true},
	value: {type: String, required: true},
	maxValue: {type: String, required: true}
});

module.exports = mongoose.model("Attribute", attribute);
