import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const User = () => {
	const navigate = useNavigate();
	let auth = localStorage.getItem("curAuth");
	let curAvatar = localStorage.getItem("curAvatar");

	const logout = async () => {
		localStorage.clear();
		try {
			await fetch(`${serverURL}logout`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<div>
			<img
				id="mainProfilePhoto"
				className="profilePhoto"
				src={curAvatar}
				alt="profile"
			/>
			<div>
				<Link
					title="Logout"
					component="button"
					variant="body2"
					onClick={async () => {
						if (await logout()) {
							navigate("/");
						}
					}}
				>
					Logout
				</Link>
				<Link
					title="Go to profile page"
					component="button"
					variant="body2"
					onClick={() => {
						localStorage.setItem("curPostImage", "");
						navigate("/profile");
					}}
				>
					Profile
				</Link>
			</div>
			<h2>{localStorage.getItem("curDisName")}</h2>
		</div>
	);
};

export default User;
