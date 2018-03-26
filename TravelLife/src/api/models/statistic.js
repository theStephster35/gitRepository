var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var statistic = new Schema(
{
	playerId: {type: ObjectId, ref: "Player"},
	name: {type: String, required: true},
	value: {type: Number, default: 0}
});

module.exports = mongoose.model("Statistic", statistic);
