import User from "./User";
import Status from "./Status";
import FriendsGrid from "./FriendsGrid";
import "./SideBar.css";
import Card from "../../Card";

const SideBar = (props) => {
	return (
		<Card>
			<User />
			<Status />
			<FriendsGrid
				handlePost={props.handlePost}
				deletePost={props.deletePost}
				addNewFriendPosts={props.addNewFriendPosts}
				handleFriend={props.handleFriend}
				deleteFriend={props.deleteFriend}
				friends={props.friends}
			/>
		</Card>
	);
};

export default SideBar;
