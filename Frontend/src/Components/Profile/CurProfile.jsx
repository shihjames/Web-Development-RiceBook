import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CakeIcon from "@mui/icons-material/Cake";
import MailIcon from "@mui/icons-material/Mail";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PasswordIcon from "@mui/icons-material/Password";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Card from "../../Card";
import "./CurProfile.css";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const CurProfile = () => {
	let navigate = useNavigate();

	let auth = localStorage.getItem("curAuth");
	let curAvatar = localStorage.getItem("curAvatar");

	const uploadImage = async (event) => {
		let fd = new FormData();
		let avatar = event.target.files[0];
		fd.append("image", avatar);

		const response = await fetch(`${serverURL}avatar`, {
			method: "PUT",
			headers: {
				Authorization: auth,
			},
			body: fd,
		});

		const resData = await response.json();
		localStorage.setItem("curAvatar", resData.avatar);
		curAvatar = localStorage.getItem("curAvatar");
		await updateAvatar();
		window.location.reload();
	};

	const updateAvatar = async () => {
		let curUser = localStorage.getItem("curUsername");

		await fetch(`${serverURL}articles/avatar/${curUser}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ avatar: curAvatar }),
		});
	};

	return (
		<Card>
			<img
				id="profilePhoto"
				className="profilePhoto"
				src={curAvatar}
				alt="profile"
			/>
			<IconButton component="label">
				<input
					hidden
					id="uploadAvatar"
					type="file"
					accept="image/*"
					onChange={uploadImage}
				/>
				<CloudUploadIcon />
			</IconButton>
			<h2 id="curDisName" className="dataRow">
				{localStorage.getItem("curDisName")}
			</h2>
			<div>
				<div className="curData">
					<AccountBoxIcon />
					<span id="curAccount" className="dataRow">
						{localStorage.getItem("curUsername")}
					</span>
				</div>
				<div className="curData">
					<CakeIcon />
					<span id="curBirth" className="dataRow">
						{localStorage.getItem("curDOB").slice(0, 10)}
					</span>
				</div>
				<div className="curData">
					<MailIcon />
					<span id="curEmail" className="dataRow">
						{localStorage.getItem("curEmail")}
					</span>
				</div>
				<div className="curData">
					<PhonelinkRingIcon />
					<span id="curPhone" className="dataRow">
						{localStorage.getItem("curPhone")}
					</span>
				</div>
				<div className="curData">
					<PinDropIcon />
					<span id="curZip" className="dataRow">
						{localStorage.getItem("curZipcode")}
					</span>
				</div>
				<div className="curData">
					<PasswordIcon />
					<span id="curPwd" className="dataRow">
						{"*".repeat(12)}
					</span>
				</div>
			</div>
			<Button
				fullWidth
				type="clear"
				variant="outlined"
				color="primary"
				sx={{ mt: 3, mb: 2 }}
				onClick={() => {
					navigate("/main");
				}}
			>
				Main
			</Button>
		</Card>
	);
};

export default CurProfile;
