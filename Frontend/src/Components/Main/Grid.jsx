import "./Grid.css";
import SideBar from "./SideBar";
import PostGrid from "./PostGrid";

const Grid = (props) => {
	return (
		<div className="grid">
			<div className="sidebar">
				<SideBar
					handlePost={props.handlePost}
					deletePost={props.deletePost}
					addNewFriendPosts={props.addNewFriendPosts}
					handleFriend={props.handleFriend}
					deleteFriend={props.deleteFriend}
					friends={props.friends}
				/>
			</div>
			<div className="postcol">
				<PostGrid
					curPosts={props.curPosts}
					filterKey={props.filterKey}
					handlePost={props.handlePost}
					editPost={props.editPost}
					handleFilter={props.handleFilter}
					resumeFilter={props.resumeFilter}
				/>
			</div>
		</div>
	);
};

export default Grid;
