import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const validateUser = async () => {
	let loginData = {
		username: document.getElementById("username").value,
		password: document.getElementById("loginPwd").value,
	};

	try {
		const loginRes = await fetch(`${serverURL}login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(loginData),
		});
		const loginResData = await loginRes.json();
		const username = loginResData.username;
		try {
			const profileRes = await fetch(
				`${serverURL}users/${username}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);
			const profiles = await profileRes.json();
			const userData = profiles.userData;
			localStorage.setItem("curUsername", userData.username);
			localStorage.setItem("curUserId", userData.userID);
			localStorage.setItem("curDisName", userData.disName);
			localStorage.setItem("curEmail", userData.email);
			localStorage.setItem("curPhone", userData.phone);
			localStorage.setItem("curZipcode", userData.zipcode);
			localStorage.setItem("curDOB", userData.dob);
			localStorage.setItem("curPwd", userData.password);
			localStorage.setItem("curHeadline", userData.headline);
			localStorage.setItem("curAvatar", userData.avatar);
			localStorage.setItem("curAuth", loginResData.authorization);
			localStorage.setItem("curPostImage", "");
			localStorage.setItem("curPage", 1);
			return true;
		} catch (err) {
			return false;
		}
	} catch (err) {
		const userInput = document.getElementById("username");
		userInput.setCustomValidity("Wrong username or password");
		userInput.reportValidity();
		return false;
	}
};

const Login = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Login</h1>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						autoFocus
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						margin="normal"
						onChange={() => {
							let username = document.getElementById("username");
							username.setCustomValidity("");
							username.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="loginPwd"
						data-testid="loginPwd"
						label="Password"
						name="password"
						type="password"
						margin="normal"
						onChange={() => {
							let loginPwd = document.getElementById("loginPwd");
							loginPwd.setCustomValidity("");
							loginPwd.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						fullWidth
						type="submit"
						variant="outlined"
						sx={{ mt: 3, mb: 2 }}
						onClick={async () => {
							if (await validateUser()) {
								navigate("/main");
							}
						}}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
