import CurProfile from "./CurProfile";
import UpdateProfile from "./UpdateProfile";
import "./Profile.css";

const Profile = () => {
	return (
		<div>
			<div>
				<h1 className="profileTitle">Personal Profile</h1>
			</div>
			<div className="profileGrid">
				<CurProfile />
				<UpdateProfile />
			</div>
		</div>
	);
};

export default Profile;
