const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("./schema/profile");
const User = require("./schema/user");
const HttpError = require("../models/http-error");

// Current logged in users
loggedInUsers = {};

// Get all user data
const getUserProfile = async (req, res, next) => {
	let username = req.params.user;
	let userData;
	if (!username) {
		userData = await Profile.find({});
	} else {
		userData = await Profile.findOne({ username: username });
	}
	res.json({ userData: userData });
};

// Register
const register = async (req, res, next) => {
	const { username, disName, email, phone, dob, zipcode, password } =
		req.body;

	// Get all user data
	const allUsers = await Profile.find({});

	// Check username
	const userData = await User.findOne({ username });
	if (userData) {
		return res.status(401).send("Username exists");
	}

	// Encode password
	let salt, hashedPwd;
	salt = await bcrypt.genSalt();
	hashedPwd = await bcrypt.hash(password, salt);

	// Genrate new user
	const newUser = new User({
		username: username,
		userID: allUsers.length,
		password: hashedPwd,
	});

	// Create new profile
	const newProfile = new Profile({
		username,
		userID: allUsers.length,
		disName,
		email,
		phone,
		dob,
		zipcode,
		password: hashedPwd,
		headline: "Welcome to Rice",
		avatar: "https://i0.wp.com/owlspark.com/wp-content/uploads/2020/02/cropped-Rice_Owl_Flat_280_Blue-01.png?fit=512%2C512&ssl=1",
	});

	// Generate new session ID
	let sid = jwt.sign(
		{ username: newUser.username },
		process.env.private_key,
		{
			expiresIn: "1d",
		}
	);

	// DB
	try {
		await newUser.save();
		await newProfile.save();
	} catch (err) {
		const error = new HttpError("Register failed", 500);
		return next(error);
	}

	// Add user to current logged in list
	loggedInUsers[username] = sid;

	res.cookie("sessionId", sid, { httpOnly: true, sameSite: "None" });
	return res.json({
		result: "success",
		username: newUser.username,
	});
};

// Login
const login = async (req, res, next) => {
	const { username, password } = req.body;

	// Find user in DB
	const userData = await User.findOne({ username });
	if (userData) {
		// Check password
		const isValidPwd = await bcrypt.compare(password, userData.password);

		// User exists & valid password
		if (isValidPwd) {
			// Generate Session ID
			let sid = jwt.sign(
				{ username: userData.username },
				process.env.private_key,
				{
					expiresIn: "1d",
				}
			);

			// Add user to current logged in list
			loggedInUsers[username] = sid;
			res.cookie("sessionId", sid, {
				maxAge: 3600 * 1000,
				httpOnly: true,
				sameSite: "None",
			});
			return res.json({
				username,
				result: "success",
				authorization: sid,
			});
		} else {
			return res.status(401).send("Wrong password");
		}
	} else {
		return res.status(401).send("No username found");
	}
};

// Validate login status
const isLoggedIn = async (req, res, next) => {
	let decodedSid;
	const headerAuth = req.headers.authorization;

	// No Session ID
	if (!headerAuth) {
		return res.status(401).send("No session");
	}
	// Decode session ID
	try {
		decodedSid = jwt.verify(headerAuth, process.env.private_key);
	} catch {
		return res.status(401).send("Session expired");
	}
	// Wrong Session ID
	if (!decodedSid.username) {
		return res.status(401).send("Invalid session");
	}
	// Already logged in
	if (!(decodedSid.username in loggedInUsers)) {
		return res.status(401).send("User already logged out");
	}

	req.username = decodedSid.username;
	next();
};

// Logout
const logout = async (req, res, next) => {
	// Clear cookie session ID
	res.clearCookie("sessionId", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
	});
	// Delete user from loggedInUsers list
	delete loggedInUsers[req.username];
	res.status(200).send("OK");
};

// Update Password
const updatePwd = async (req, res, next) => {
	const newPwd = req.body.password;
	const userData = await User.findOne({ username: req.username });
	if (userData) {
		let salt = await bcrypt.genSalt();
		let hashedPwd = await bcrypt.hash(newPwd, salt);
		userData.password = hashedPwd;
		try {
			userData.save();
			res.json({
				username: userData.username,
				password: hashedPwd,
				result: "success",
			});
		} catch (err) {
			const error = new HttpError("Update password failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("User not found");
	}
};

module.exports = (app) => {
	app.get("/users/:user?", getUserProfile);
	app.post("/register", register);
	app.post("/login", login);
	app.use("/", isLoggedIn);
	app.put("/logout", logout);
	app.put("/password", updatePwd);
};
