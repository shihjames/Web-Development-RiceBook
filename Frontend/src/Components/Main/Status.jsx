import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ClearIcon from "@mui/icons-material/Clear";
import "./Status.css";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const Status = () => {
	const handleStatus = async () => {
		let auth = localStorage.getItem("curAuth");
		let newHeadline = document.getElementById("postStatus").value;

		// Update headline
		if (newHeadline.length > 0) {
			document.getElementById("userStatus").innerHTML = newHeadline;
			localStorage.setItem("curHeadline", newHeadline);
			document.getElementById("postStatus").value = "";

			await fetch(`${serverURL}headline`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
				body: JSON.stringify({ headline: newHeadline }),
			});
		}
	};

	const clearStatus = () => {
		document.getElementById("postStatus").value = "";
	};

	return (
		<div>
			<h4 id="userStatus" data-testid="userStatus">
				{localStorage.getItem("curHeadline")}
			</h4>
			<IconButton
				title="Update your status"
				component="label"
				onClick={handleStatus}
			>
				<TipsAndUpdatesIcon />
			</IconButton>

			<TextField
				multiline
				id="postStatus"
				label="Status"
				placeholder="What's on your mind?"
				variant="standard"
			/>
			<IconButton
				title="Clear status contents"
				component="label"
				onClick={clearStatus}
			>
				<ClearIcon />
			</IconButton>
		</div>
	);
};

export default Status;
