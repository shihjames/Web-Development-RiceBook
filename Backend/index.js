const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsSetting = { origin: "*", credentials: true };
const mongoose = require("mongoose");
const express = require("express");

const auth = require("./src/auth");
const profiles = require("./src/profiles");
const followings = require("./src/followings");
const articles = require("./src/articles");

const app = express();
app.use(cors(corsSetting));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	next();
});

auth(app);
profiles(app);
followings(app);
articles(app);

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "Unknown error" });
});

const db_url = `mongodb+srv://${process.env.db_username}:${process.env.db_pwd}@cluster0.ouhea4i.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;
const port = process.env.PORT || 4000;
mongoose
	.connect(db_url)
	.then(() => {
		app.listen(port);
		console.log(`listening at port http://localhost:${port}`);
	})
	.catch((err) => {
		console.log(err);
	});
