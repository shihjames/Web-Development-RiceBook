const multer = require("multer");
const stream = require("stream");
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: "hgui2nfzp",
	api_key: "841478494931363",
	api_secret: "vx81arOaPsUnFDQuqNXzSaY0c8o",
});

if (!process.env.CLOUDINARY_URL) {
	process.env.CLOUDINARY_URL =
		"cloudinary://841478494931363:vx81arOaPsUnFDQuqNXzSaY0c8o@hgui2nfzp";
}

const doUpload = (publicName, req, res, next) => {
	const uploadStream = cloudinary.uploader.upload_stream(
		(result) => {
			req.fileurl = result.url;
			req.fileid = result.public_id;
			console.log(result.url);
			next();
		},
		{ public_id: req.body[publicName] }
	);

	const s = new stream.PassThrough();
	s.end(req.file.buffer);
	s.pipe(uploadStream);
	s.on("end", uploadStream.end);
};

const uploadImage = (publicName) => (req, res, next) =>
	multer().single("image")(req, res, () =>
		doUpload(publicName, req, res, next)
	);

module.exports = uploadImage;
