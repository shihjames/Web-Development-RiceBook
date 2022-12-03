import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import "./Comment.css";

const Comment = (props) => {
	const showEditComment = () => {
		let curUser = localStorage.getItem("curUsername");
		if (curUser === props.commenter) {
			let editInput = document.getElementById(
				"editComment-" + props.pid + "-" + props.cid
			);
			let status = editInput.style.display;
			if (status === "none") {
				editInput.style.display = "block";
			} else {
				editInput.style.display = "none";
			}
		}
	};

	const editComment = () => {
		props.editComment(props.cid);
	};

	return (
		<div className="comment">
			<div className="commentGrid">
				<p>
					<img
						className="commentAvatar"
						src={props.avatar}
						alt="commentAvatar"
					/>
				</p>
				<p
					id={"comment-" + props.pid + "-" + props.cid}
					className="commentText"
				>
					{props.text}
				</p>
				<IconButton title="Edit comments" onClick={showEditComment}>
					<MoreVertIcon />
				</IconButton>
			</div>
			<div
				id={"editComment-" + props.pid + "-" + props.cid}
				className="editComment"
				style={{ display: "none" }}
			>
				<Stack direction="row" spacing={2}>
					<IconButton title="Update comments" onClick={editComment}>
						<TipsAndUpdatesIcon />
					</IconButton>
					<TextField
						id={"newComment-" + props.pid + "-" + props.cid}
						label="Edit your comment"
						multiline
						fullWidth
						maxRows={5}
					></TextField>
				</Stack>
			</div>
		</div>
	);
};

export default Comment;
