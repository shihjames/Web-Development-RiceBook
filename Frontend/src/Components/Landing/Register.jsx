import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

// Account validation
const accountVal = () => {
	let account = document.getElementById("account");
	if (account.value === "") {
		account.setCustomValidity("Account name is required");
		account.reportValidity();
		return false;
	} else {
		if (!/^[A-Za-z]+[A-Za-z0-9]*$/.test(account.value)) {
			account.setCustomValidity(
				"Account name can only be upper or lower case letters and numbers, but may not start with a number"
			);
			account.reportValidity();
			return false;
		} else {
			account.setCustomValidity("");
			account.reportValidity();
			return true;
		}
	}
};

// Email validation
const emailVal = () => {
	let email = document.getElementById("email");
	if (email.value === "") {
		email.setCustomValidity("Email is required");
		email.reportValidity();
		return false;
	} else {
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
				email.value
			)
		) {
			email.setCustomValidity("Expect proper format example123@mail.com");
			email.reportValidity();
			return false;
		} else {
			email.setCustomValidity("");
			email.reportValidity();
			return true;
		}
	}
};

// Phone validation
const phoneVal = () => {
	let phone = document.getElementById("phone");
	if (phone.value === "") {
		phone.setCustomValidity("Phone number is required");
		phone.reportValidity();
		return false;
	} else {
		if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone.value)) {
			phone.setCustomValidity("Expect proper format 123-456-7890");
			phone.reportValidity();
			return false;
		} else {
			phone.setCustomValidity("");
			phone.reportValidity();
			return true;
		}
	}
};

// Zip validation
const zipVal = () => {
	let zip = document.getElementById("zip");
	if (zip.value === "") {
		zip.setCustomValidity("Zipcode is required");
		zip.reportValidity();
		return false;
	} else {
		if (!/^([0-9]{5})$/.test(zip.value)) {
			zip.setCustomValidity("Expect proper format 12345");
			zip.reportValidity();
			return false;
		} else {
			zip.setCustomValidity("");
			zip.reportValidity();
			return true;
		}
	}
};

// Birth validation
const birthVal = () => {
	let birth = document.getElementById("birth");
	if (birth.value === "") {
		birth.setCustomValidity("Birth is required");
		birth.reportValidity();
		return false;
	} else {
		let values = birth.value.split("-");
		let year = values[0];
		let month = values[1];
		let day = values[2];
		let current = new Date();
		let age = current.getFullYear() - year;
		if (
			current.getMonth() + 1 - month < 0 ||
			(current.getMonth() + 1 - month === 0 &&
				current.getDate() - day < 0)
		) {
			age = age - 1;
		}
		if (age < 18) {
			birth.setCustomValidity("You should be at least 18 to register!");
			birth.reportValidity();
			return false;
		} else {
			birth.setCustomValidity("");
			birth.reportValidity();
			return true;
		}
	}
};

// Password validation
const pwdVal = () => {
	let password = document.getElementById("regPwd");
	let retypePwd = document.getElementById("retypePwd");
	if (password.value !== "" && retypePwd.value !== "") {
		if (password.value === retypePwd.value) {
			retypePwd.setCustomValidity("");
			retypePwd.reportValidity();
			return true;
		} else {
			retypePwd.setCustomValidity("Please confirm your password again!");
			retypePwd.reportValidity();
			return false;
		}
	} else {
		retypePwd.setCustomValidity("Password should not be empty!");
		retypePwd.reportValidity();
		return false;
	}
};

const validate = async () => {
	if (
		accountVal() &&
		emailVal() &&
		phoneVal() &&
		zipVal() &&
		birthVal() &&
		pwdVal()
	) {
		let username = document.getElementById("account").value;
		let disName = document.getElementById("disName").value;
		let email = document.getElementById("email").value;
		let phone = document.getElementById("phone").value;
		let zip = document.getElementById("zip").value;
		let birth = document.getElementById("birth").value;
		let password = document.getElementById("regPwd").value;

		// Send request to backend
		const fetchData = {
			username: username,
			disName: disName,
			email: email,
			phone: phone,
			dob: birth,
			zipcode: zip,
			password: password,
		};

		try {
			const response = await fetch(`${serverURL}register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fetchData),
			});
			// Get current user profile
			if (response.status === 200) {
				const loginRes = await fetch(`${serverURL}login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				});
				const loginResData = await loginRes.json();
				// Get user data

				const profileRes = await fetch(
					`${serverURL}users/${username}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
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
			} else {
				let account = document.getElementById("account");
				account.setCustomValidity("Username is used");
				account.reportValidity();
				return false;
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	}
	return false;
};

const clearInput = () => {
	document.getElementById("account").value = "";
	document.getElementById("disName").value = "";
	document.getElementById("email").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("zip").value = "";
	document.getElementById("birth").value = "";
	document.getElementById("regPwd").value = "";
	document.getElementById("retypePwd").value = "";
};

const Register = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Register</h1>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						autoFocus
						required
						fullWidth
						id="account"
						name="account"
						label="Account Name"
						onChange={() => {
							let account = document.getElementById("account");
							account.setCustomValidity("");
							account.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="disName"
						label="Display Name"
						name="disName"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						onChange={() => {
							let email = document.getElementById("email");
							email.setCustomValidity("");
							email.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="phone"
						label="Phone Number"
						name="phone"
						onChange={() => {
							let phone = document.getElementById("phone");
							phone.setCustomValidity("");
							phone.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="birth"
						data-testid="birthInput"
						type="date"
						name="birth"
						onChange={() => {
							let birth = document.getElementById("birth");
							birth.setCustomValidity("");
							birth.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="zip"
						label="Zipcode"
						name="zip"
						onChange={() => {
							let zip = document.getElementById("zip");
							zip.setCustomValidity("");
							zip.reportValidity();
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="regPwd"
						label="Password"
						name="password"
						type="password"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						id="retypePwd"
						label="Retype Password"
						name="password"
						type="password"
						onChange={() => {
							let retypePwd =
								document.getElementById("retypePwd");
							retypePwd.setCustomValidity("");
							retypePwd.reportValidity();
						}}
					/>
				</Grid>
			</Grid>
			<Grid>
				<Button
					fullWidth
					id="regBtn"
					type="submit"
					variant="outlined"
					sx={{ mt: 3, mb: 2 }}
					onClick={async () => {
						if (await validate()) {
							navigate("/main");
						}
					}}
				>
					Register
				</Button>
				<Button
					fullWidth
					type="clear"
					variant="outlined"
					sx={{ mt: 3, mb: 2 }}
					onClick={clearInput}
				>
					Clear
				</Button>
			</Grid>
		</div>
	);
};

export default Register;
