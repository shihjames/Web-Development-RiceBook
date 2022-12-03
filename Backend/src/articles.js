const Article = require("./schema/article");
const Profile = require("./schema/profile");
const uploadImage = require("./uploadCloudinary");
const HttpError = require("../models/http-error");

// Get articles
const getArticle = async (req, res, next) => {
	const id = req.params.id;
	if (id) {
		if (isNaN(id)) {
			const articles = await Article.find({ author: id });
			return res.send({ articles });
		} else {
			const articles = await Article.find({ pid: id });
			return res.send({ articles });
		}
	} else {
		const userData = await Profile.findOne({ username: req.username });
		const articles = await Article.find({
			author: { $in: [...userData.following, req.username] },
		});
		return res.send({ articles });
	}
};

// Update article
// Add new comment
// Update comment
const updateArticle = async (req, res, next) => {
	const { text, commentId } = req.body;
	const id = req.params.id;
	if (!commentId) {
		const article = await Article.findOne({
			pid: id,
		});

		if (!article) {
			return res.status(401).send("Unauthorized user");
		} else {
			try {
				article.content = text;
				await article.save();
				res.json({ article });
			} catch (err) {
				const error = new HttpError("Update article failed", 500);
				return next(error);
			}
		}
	} else if (commentId === -1) {
		const article = await Article.findOne({
			pid: id,
		});

		if (!article) {
			return res.status(401).send("Unauthorized user");
		} else {
			const userData = await Profile.findOne({ username: req.username });
			const newComment = {
				text: text,
				cid: article.comment.length,
				commenter: req.username,
				avatar: userData.avatar,
				date: Date.now(),
			};
			try {
				article.comment.push(newComment);
				await article.save();
				res.json({ article });
			} catch (err) {
				const error = new HttpError("Post comment failed", 500);
				return next(error);
			}
		}
	} else if (!isNaN(commentId)) {
		const article = await Article.findOne({
			pid: id,
		});

		if (!article) {
			return res.status(401).send("Unauthorized user");
		} else {
			if (commentId >= article.comment.length) {
				return res.status(401).send("Invalid comment ID");
			} else {
				try {
					const userData = await Profile.findOne({
						username: req.username,
					});
					article.comment[commentId] = {
						cid: commentId,
						commenter: req.username,
						text: text,
						date: Date.now(),
						avatar: userData.avatar,
					};
					await article.save();
					res.json({ article });
				} catch (err) {
					const error = new HttpError("Update comment failed", 500);
					return next(error);
				}
			}
		}
	} else {
		return res.status(401).send("Invalid post format");
	}
};

// Post article
const postArticle = async (req, res, next) => {
	let { text, imageURL } = req.body;

	if (!imageURL) {
		imageURL = "";
	}

	if (text) {
		const profile = await Profile.findOne({ username: req.username });
		const newArticle = new Article({
			pid: Date.now(),
			author: req.username,
			avatar: profile.avatar,
			content: text,
			date: Date.now(),
			millis: Date.now(),
			image: imageURL,
			comment: [],
		});
		try {
			await newArticle.save();
			// const articles = await Article.find({ author: req.username });
			res.json({ articles: newArticle });
		} catch (err) {
			const error = new HttpError("Post article failed", 500);
			return next(error);
		}
	} else {
		res.status(401).send("Invalid post format");
	}
};

// Upload new article image
const uploadPostImage = async (req, res, next) => {
	const postImage = req.fileurl;
	res.json({ username: req.username, postImage: postImage });
};

// Update avatar for articles
const updateArticlesAvatar = async (req, res, next) => {
	const newAvatar = req.body.avatar;
	const articles = await Article.find({});
	for (let i = 0; i < articles.length; i++) {
		if (articles[i].author === req.username) {
			articles[i].avatar = newAvatar;
		}
		for (let j = 0; j < articles[i].comment.length; j++) {
			if (articles[i].comment[j].commenter === req.username) {
				articles[i].comment[j].avatar = newAvatar;
			}
		}
		try {
			await articles[i].save();
		} catch (err) {
			const error = new HttpError("Update article avatar failed", 500);
			return next(error);
		}
	}
	res.json({ articles: articles });
};

module.exports = (app) => {
	app.get("/articles/:id?", getArticle);
	app.put("/articles/:id", updateArticle);
	app.post("/article", postArticle);
	app.put("/article/image", uploadImage("postImage"), uploadPostImage);
	app.put("/articles/avatar/:user", updateArticlesAvatar);
};
