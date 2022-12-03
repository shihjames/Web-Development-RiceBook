import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Friend.css";
const serverURL = "https://ricebook-final-js.herokuapp.com/";


const Friends = (props) => {
	let auth = localStorage.getItem("curAuth");

	const deleteFriend = async () => {
		await fetch(`${serverURL}following/${props.username}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
		});
		props.deleteFriend(props.username);
		props.deletePost(props.username);
		localStorage.setItem("curPage", "1");
		window.location.reload();
	};

	return (
		<div className="friend">
			<img
				id={"friendPhoto" + props.index}
				className="profilePhoto"
				src={props.avatar}
				alt="profile"
			/>
			<IconButton
				title="Delete this friend"
				onClick={deleteFriend}
			>
				<CancelIcon />
			</IconButton>
			<h2 id={"friendName" + props.index}>{props.disName}</h2>
			<h4>{props.headline}</h4>
		</div>
	);
};

export default Friends;
