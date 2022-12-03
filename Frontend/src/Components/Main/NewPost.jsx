import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./NewPost.css";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const NewPost = (props) => {
	let display;
	let uploadStaus = localStorage.getItem("curPostImage");
	let auth = localStorage.getItem("curAuth");

	if (uploadStaus !== "") {
		display = "inline";
	} else {
		display = "none";
	}

	const handlePost = async () => {
		let auth = localStorage.getItem("curAuth");
		let curPostImage = localStorage.getItem("curPostImage");
		let newPostInput = document.getElementById("createPost");
		let body = { text: newPostInput.value };
		if (curPostImage !== "") {
			body.imageURL = curPostImage;
		}

		if (newPostInput.value.length > 0) {
			try {
				const response = await fetch(`${serverURL}article`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: auth,
					},
					body: JSON.stringify(body),
				});
				const resData = await response.json();
				props.handlePost(resData.articles);
				clearPost();
				window.location.reload();
			} catch (err) {
				console.log(err);
			}
			localStorage.setItem("curPostImage", "");
		}
	};

	const clearPost = () => {
		document.getElementById("createPost").value = "";
	};

	const uploadImage = async (event) => {
		let fd = new FormData();
		let postImage = event.target.files[0];
		fd.append("image", postImage);

		const response = await fetch(`${serverURL}article/image`, {
			method: "PUT",
			headers: {
				Authorization: auth,
			},
			body: fd,
		});
		const resData = await response.json();
		localStorage.setItem("curPostImage", resData.postImage);
		window.location.reload();
	};

	return (
		<div>
			<div>
				<TextField
					multiline
					fullWidth
					id="createPost"
					label="New Post!"
					placeholder="Share something"
					rows={4}
					variant="filled"
				/>
				<div style={{ display }}>
					<img
						id={"postImage-" + props.pid}
						className="newPostImage"
						src={uploadStaus}
						alt=""
					/>
				</div>
				<IconButton title="Post!" component="label" onClick={handlePost}>
					<AddIcon />
				</IconButton>
				<IconButton title="Empty contents" component="label" onClick={clearPost}>
					<ClearIcon />
				</IconButton>
				<IconButton title="Upload an image" component="label">
					<input
						hidden
						id="uploadPostImage"
						accept="image/*"
						type="file"
						onChange={uploadImage}
					/>
					<InsertPhotoIcon />
				</IconButton>
				<IconButton style={{ display }} component="label">
					<CheckCircleIcon color="primary" />
					<Typography
						style={{ display: "inline" }}
						color="primary"
						fontSize={10}
					>
						Uploaded
					</Typography>
				</IconButton>
			</div>
		</div>
	);
};

export default NewPost;
