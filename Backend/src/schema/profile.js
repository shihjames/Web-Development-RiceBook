const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	userID: { type: Number, required: true, unique: true },
	disName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	dob: { type: Date, required: true },
	zipcode: { type: String, required: true },
	password: { type: String, required: true },
	headline: { type: String },
	avatar: { type: String },
	following: { type: [] },
});

module.exports = mongoose.model("Profile", profileSchema);
