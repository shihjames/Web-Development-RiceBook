import Card from "../../Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import "./Post.css";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const Post = (props) => {
	let display;
	if (props.image !== "") {
		display = "inline";
	} else {
		display = "none";
	}

	let data = props.date.split("T");
	let date = data[0];
	let time = data[1].split(".")[0];

	let curComments = props.comments;
	let [pageComments, setComments] = useState(curComments);

	useEffect(() => {
		setComments(curComments);
	}, [curComments]);

	const showComment = () => {
		let commentDiv = document.getElementById("commentDiv-" + props.pid);
		let commentDisplay = commentDiv.style.display;
		if (commentDisplay === "none") {
			commentDiv.style.display = "inline";
		} else {
			commentDiv.style.display = "none";
		}
	};

	const leaveComment = async () => {
		let auth = localStorage.getItem("curAuth");
		let newComment = document.getElementById("newComment-" + props.pid);
		if (newComment.value.length > 0) {
			const body = { text: newComment.value, commentId: -1 };
			const response = await fetch(`${serverURL}articles/${props.pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
				body: JSON.stringify(body),
			});

			const resData = await response.json();
			newComment.value = "";
			curComments = [...resData.article.comment];
			setComments(curComments);
		}
	};

	const editComment = async (cid) => {
		// Update comment in frontend
		let commentText = document.getElementById(
			"comment-" + props.pid + "-" + cid
		);
		let editComment = document.getElementById(
			"editComment-" + props.pid + "-" + cid
		);
		let newComment = document.getElementById(
			"newComment-" + props.pid + "-" + cid
		);
		if (newComment.value.length > 0) {
			commentText.innerHTML = newComment.value;
			editComment.style.display = "none";

			// Update comment in backend
			let auth = localStorage.getItem("curAuth");
			const body = { text: newComment.value, commentId: cid };
			await fetch(`${serverURL}articles/${props.pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
				body: JSON.stringify(body),
			});
			newComment.value = "";
		}
	};

	const showEditPost = () => {
		let curUser = localStorage.getItem("curUsername");
		if (curUser === props.author) {
			let editInput = document.getElementById("editPost-" + props.pid);
			let status = editInput.style.display;
			if (status === "none") {
				editInput.style.display = "block";
			} else {
				editInput.style.display = "none";
			}
		}
	};

	const editPost = async () => {
		let auth = localStorage.getItem("curAuth");
		let newContent = document.getElementById("editPostInput-" + props.pid);
		let editPostDiv = document.getElementById("editPost-" + props.pid);
		if (newContent.value.length > 0) {
			props.editPost(props.pid, newContent.value);
			await fetch(`${serverURL}articles/${props.pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
				body: JSON.stringify({ text: newContent.value }),
			});
			newContent.value = "";
			editPostDiv.style.display = "none";
			window.location.reload();
		}
	};

	return (
		<Card id={"postCard" + props.pid} className="postCard">
			{/* Author image */}
			<img
				id={"postByPhoto-" + props.pid}
				className="postByPhoto"
				src={props.avatar}
				alt="profile"
			/>
			<span className="userName">{props.author}</span>
			{/* Edit post button */}
			<IconButton
				id={"showEditPost-" + props.pid}
				className="editPostBtn"
				onClick={showEditPost}
			>
				<MoreVertIcon />
			</IconButton>
			{/* Post date */}
			<div id={"date-" + props.pid} className="date">
				{date + " " + time.slice(0, 5)}
			</div>
			{/* Article body */}
			<div className="articleBodyDiv">
				{/* Article image */}
				<div className="imageDiv" style={{ display }}>
					<img
						id={"postImage-" + props.pid}
						className="postImage"
						src={props.image}
						alt="Article pic"
					/>
				</div>
				{/* Article text */}
				<div id={"text-" + props.pid} className="article">
					{props.body}
				</div>
				{/* Edit post input */}
				<div
					id={"editPost-" + props.pid}
					className="displayable"
					style={{ display: "none" }}
				>
					<Stack direction="row" spacing={2}>
						<IconButton
							id={"editPostBtn" + props.pid}
							onClick={editPost}
						>
							<TipsAndUpdatesIcon />
						</IconButton>
						<TextField
							id={"editPostInput-" + props.pid}
							label="Edit your post"
							multiline
							fullWidth
							maxRows={5}
						></TextField>
					</Stack>
				</div>
			</div>
			{/* Buttons */}
			<div className="btnStack">
				<Stack direction="row" spacing={2}>
					<IconButton title="Like!">
						<CelebrationIcon />
					</IconButton>
					<IconButton
						id={"showCommentBtn-" + props.pid}
						title="Show comments"
						onClick={showComment}
					>
						<ChatIcon />
					</IconButton>
				</Stack>
			</div>
			{/* Comments */}
			<div
				id={"commentDiv-" + props.pid}
				className="displayable"
				style={{ display: "none" }}
			>
				<Card className="commentDiv">
					{pageComments.map((comment, idx) => {
						return (
							<Comment
								key={idx}
								index={idx}
								pid={props.pid}
								cid={comment.cid}
								commenter={comment.commenter}
								text={comment.text}
								avatar={comment.avatar}
								date={comment.date.slice(0, 10)}
								editComment={editComment}
							/>
						);
					})}
					{/* Edit comment */}
					<Stack direction="row" spacing={2}>
						<IconButton
							title="Share your thoughts"
							onClick={async () => {
								await leaveComment();
							}}
						>
							<SendIcon />
						</IconButton>
						<TextField
							id={"newComment-" + props.pid}
							label="Share your thoughts"
							multiline
							fullWidth
							maxRows={5}
						></TextField>
					</Stack>
				</Card>
			</div>
		</Card>
	);
};

export default Post;
