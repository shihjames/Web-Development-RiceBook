import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const AddFriend = (props) => {
	const handleFriend = async () => {
		let curFriends = props.friends;
		let addFriendInput = document.getElementById("addFriend");
		let allUsers = JSON.parse(localStorage.getItem("allusers")).userData;
		let auth = localStorage.getItem("curAuth");

		// Already friends
		for (let i = 0; i < curFriends.length; i++) {
			if (curFriends[i].username === addFriendInput.value) {
				addFriendInput.setCustomValidity("You are already friends");
				addFriendInput.reportValidity();
				return;
			}
		}

		// Adding yourself
		if (addFriendInput.value === localStorage.getItem("curUsername")) {
			addFriendInput.setCustomValidity("Cannot add yourself!");
			addFriendInput.reportValidity();
			return;
		}

		// User found
		let newFriend;
		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i].username === addFriendInput.value) {
				newFriend = allUsers[i];
				break;
			}
		}
		if (!newFriend) {
			// User not found
			addFriendInput.setCustomValidity("User not Found!");
			addFriendInput.reportValidity();
		} else {
			// User found
			await fetch(`${serverURL}following/${newFriend.username}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
			});
			// Fetch new friend's posts
			const response = await fetch(
				`${serverURL}articles/${newFriend.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: auth,
					},
				}
			);
			const resData = await response.json();
			props.handleFriend(newFriend);
			props.addNewFriendPosts(resData.articles);
			addFriendInput.value = "";
			window.location.reload();
		}
	};

	return (
		<div>
			<div>
				<IconButton
					title="Add a friend"
					component="label"
					onClick={handleFriend}
				>
					<PeopleAltIcon />
				</IconButton>
				<TextField
					id="addFriend"
					label="Add a friend"
					placeholder="User ID"
					variant="standard"
					onChange={() => {
						let addNameField = document.getElementById("addFriend");
						addNameField.setCustomValidity("");
						addNameField.reportValidity();
					}}
				/>
			</div>
		</div>
	);
};

export default AddFriend;
