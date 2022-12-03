const Profile = require("./schema/profile");
const HttpError = require("../models/http-error");

// Get following
const getFollowing = async (req, res, next) => {
	let user = req.params.user;

	if (!user) {
		const userData = await Profile.findOne({ username: req.username });
		if (userData) {
			res.json({
				username: userData.username,
				following: userData.following,
			});
		} else {
			res.status(401).send("User not found");
		}
	} else {
		const userData = await Profile.findOne({ username: user });
		if (userData) {
			res.json({
				username: userData.username,
				following: userData.following,
			});
		} else {
			res.status(401).send("User not found");
		}
	}
};

// Add following
const addFollowing = async (req, res, next) => {
	const newFollowing = req.params.user;

	const userData = await Profile.findOne({ username: req.username });
	const newFollowingData = await Profile.findOne({ username: newFollowing });
	if (userData && newFollowingData) {
		if (!userData.following.includes(newFollowing)) {
			userData.following.push(newFollowing);
			try {
				userData.save();
				res.json({
					username: userData.username,
					following: userData.following,
				});
			} catch (err) {
				const error = new HttpError("Add friend failed", 500);
				return next(error);
			}
		} else {
			res.status(401).send("Already friends");
		}
	} else {
		res.status(401).send("User not found");
	}
};

// Delete following
const deleteFollowing = async (req, res, next) => {
	const target = req.params.user;

	const userData = await Profile.findOne({ username: req.username });
	if (userData) {
		const index = userData.following.indexOf(target);
		if (index === -1) {
			return res.status(401).send("User not found");
		} else {
			userData.following.splice(index, 1);
		}
		try {
			userData.save();
			res.json({
				username: userData.username,
				following: userData.following,
			});
		} catch (err) {
			const error = new HttpError("Delete friend failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

module.exports = (app) => {
	app.get("/following/:user?", getFollowing);
	app.put("/following/:user", addFollowing);
	app.delete("/following/:user", deleteFollowing);
};
