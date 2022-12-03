const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	pid: { type: Number, required: true, unique: true },
	author: { type: String, required: true },
	avatar: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Date, required: true },
	millis: { type: Number, required: true },
	image: { type: String },
	comment: [
		{
			cid: { type: String, required: true },
			commenter: { type: String, required: true },
			text: { type: String, required: true },
			date: { type: Date, requires: true },
			avatar: { type: String, required: true },
		},
	],
});

module.exports = mongoose.model("Article", articleSchema);
