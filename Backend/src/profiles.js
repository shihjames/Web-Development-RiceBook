const Profile = require("./schema/profile");
const uploadImage = require("./uploadCloudinary");
const HttpError = require("../models/http-error");

// Get headline
const getHeadline = async (req, res, next) => {
	let user = req.params.user;
	if (!user) {
		const userData = await Profile.findOne({ username: req.username });
		if (userData) {
			res.json({
				username: userData.username,
				headline: userData.headline,
			});
		} else {
			res.status(401).send("User not found");
		}
	} else {
		const userData = await Profile.findOne({ username: user });
		if (userData) {
			res.json({
				username: userData.username,
				headline: userData.headline,
			});
		} else {
			res.status(401).send("User not found");
		}
	}
};

// Update headline
const updateHeadline = async (req, res, next) => {
	const newHeadline = req.body.headline;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.headline = newHeadline;
		try {
			userData.save();
			res.json({
				username: userData.username,
				headline: userData.headline,
			});
		} catch (err) {
			const error = new HttpError("Update headline failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Update display name
const updateDisName = async (req, res, next) => {
	const newDisName = req.body.disName;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.disName = newDisName;
		try {
			userData.save();
			res.json({
				username: userData.username,
				disName: userData.disName,
			});
		} catch (err) {
			const error = new HttpError("Update display name failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Get email
const getEmail = async (req, res, next) => {
	let user = req.params.user;

	if (!user) {
		const userData = await Profile.findOne({ username: req.username });
		if (userData) {
			res.json({
				username: userData.username,
				email: userData.email,
			});
		} else {
			res.status(401).send("User not found");
		}
	} else {
		const userData = await Profile.findOne({ username: user });
		if (userData) {
			res.json({
				username: userData.username,
				email: userData.email,
			});
		} else {
			res.status(401).send("User not found");
		}
	}
};

// Update email
const updateEmail = async (req, res, next) => {
	const newEmail = req.body.email;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.email = newEmail;
		try {
			userData.save();
			res.json({ username: userData.username, email: userData.email });
		} catch (err) {
			const error = new HttpError("Update email failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Update phone
const updatePhone = async (req, res, next) => {
	const newPhone = req.body.phone;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.phone = newPhone;
		try {
			userData.save();
			res.json({ username: userData.username, phone: userData.phone });
		} catch (err) {
			const error = new HttpError("Update phone failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Get zipcode
const getZip = async (req, res, next) => {
	let user = req.params.user;

	if (!user) {
		const userData = await Profile.findOne({ username: req.username });
		if (userData) {
			res.json({
				username: userData.username,
				zipcode: userData.zipcode,
			});
		} else {
			res.status(401).send("User not found");
		}
	} else {
		const userData = await Profile.findOne({ username: user });
		if (userData) {
			res.json({
				username: userData.username,
				zipcode: userData.zipcode,
			});
		} else {
			res.status(401).send("User not found");
		}
	}
};

// Update zipcode
const updateZip = async (req, res, next) => {
	const newZip = req.body.zipcode;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.zipcode = newZip;
		try {
			userData.save();
			res.json({
				username: userData.username,
				zipcode: userData.zipcode,
			});
		} catch (err) {
			const error = new HttpError("Update zipcode failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Get DOB
const getDOB = async (req, res, next) => {
	let user = req.params.user;

	if (!user) {
		const userData = await Profile.findOne({ username: req.username });
		if (userData) {
			res.json({
				username: userData.username,
				dob: userData.dob.getTime(),
			});
		} else {
			res.status(401).send("User not found");
		}
	} else {
		const userData = await Profile.findOne({ username: user });
		if (userData) {
			res.json({
				username: userData.username,
				dob: userData.dob.getTime(),
			});
		} else {
			res.status(401).send("User not found");
		}
	}
};

// Update date of birth
const updateDOB = async (req, res, next) => {
	const newDOB = req.body.dob;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.dob = newDOB;
		try {
			userData.save();
			res.json({ username: userData.username, dob: userData.dob });
		} catch (err) {
			const error = new HttpError("Update dob failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Get avatar
const getAvatar = async (req, res, next) => {
	let user = req.params.user;

	if (!user) {
		const userData = await Profile.findOne({ username: req.username });
		if (userData) {
			res.json({
				username: userData.username,
				avatar: userData.avatar,
			});
		} else {
			res.status(401).send("User not found");
		}
	} else {
		const userData = await Profile.findOne({ username: user });
		if (userData) {
			res.json({
				username: userData.username,
				avatar: userData.avatar,
			});
		} else {
			res.status(401).send("User not found");
		}
	}
};

// Update avatar
const updateAvatar = async (req, res, next) => {
	const newAvatar = req.fileurl;
	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		userData.avatar = newAvatar;
		try {
			userData.save();
			res.json({ username: userData.username, avatar: userData.avatar });
		} catch (err) {
			const error = new HttpError("Update avatar failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

module.exports = (app) => {
	// Headline
	app.get("/headline/:user?", getHeadline);
	app.put("/headline", updateHeadline);

	// Display name
	app.put("/disname", updateDisName);

	// Email
	app.get("/email/:user?", getEmail);
	app.put("/email", updateEmail);

	// Phone
	app.put("/phone", updatePhone);

	// Zip
	app.get("/zipcode/:user?", getZip);
	app.put("/zipcode", updateZip);

	// DOB
	app.get("/dob/:user?", getDOB);
	app.put("/dob", updateDOB);

	// Avatar
	app.get("/avatar/:user?", getAvatar);
	app.put("/avatar", uploadImage("avatar"), updateAvatar);
};
