import Friend from "./Friend";
import AddFriend from "./AddFriend";

const FriendsGrid = (props) => {
	return (
		<div>
			<AddFriend
				friends={props.friends}
				handleFriend={props.handleFriend}
				handlePost={props.handlePost}
				addNewFriendPosts={props.addNewFriendPosts}
			/>
			<div id="friendList">
				{props.friends.map((friend, idx) => {
					return (
						<Friend
							key={idx}
							index={idx}
							username={friend.username}
							disName={friend.disName}
							headline={friend.headline}
							avatar={friend.avatar}
							deletePost={props.deletePost}
							deleteFriend={props.deleteFriend}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default FriendsGrid;
