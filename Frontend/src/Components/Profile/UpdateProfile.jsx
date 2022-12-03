import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./UpdateProfile.css";
import Card from "../../Card";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

// Update Display Name

const disNameUpdate = () => {
	let disName = document.getElementById("updateDisName");
	if (disName.value !== "") {
		return true;
	} else {
		return false;
	}
};

// Email validation
const emailVal = () => {
	let email = document.getElementById("updateEmail");
	if (email.value !== "") {
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
	let phone = document.getElementById("updatePhone");
	if (phone.value !== "") {
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
	let zip = document.getElementById("updateZip");
	if (zip.value !== "") {
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
	let birth = document.getElementById("updateBirth");
	if (birth.value !== "") {
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
			birth.setCustomValidity("You should be at least 18!");
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
	let password = document.getElementById("updatePwd");
	let retypePwd = document.getElementById("retypeUpdatePwd");
	if ((password.value !== "") & (retypePwd.value !== "")) {
		if (password.value === retypePwd.value) {
			retypePwd.setCustomValidity("");
			retypePwd.reportValidity();
			return true;
		} else {
			retypePwd.setCustomValidity("Please confirm your password again!");
			retypePwd.reportValidity();
			return false;
		}
	}
};

const validate = async () => {
	let auth = localStorage.getItem("curAuth");
	// Display name
	if (disNameUpdate()) {
		let disName = document.getElementById("updateDisName");
		await fetch(`${serverURL}disName`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ disName: disName.value }),
		});
		document.getElementById("curDisName").innerHTML = disName.value;
		localStorage.setItem("curDisName", disName.value);
		disName.value = "";
	}
	// Email
	if (emailVal()) {
		let email = document.getElementById("updateEmail");
		await fetch(`${serverURL}email`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ email: email.value }),
		});
		document.getElementById("curEmail").innerHTML = email.value;
		localStorage.setItem("curEmail", email.value);
		email.value = "";
	}
	// Phone
	if (phoneVal()) {
		let phone = document.getElementById("updatePhone");
		await fetch(`${serverURL}phone`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ phone: phone.value }),
		});
		document.getElementById("curPhone").innerHTML = phone.value;
		localStorage.setItem("curPhone", phone.value);
		phone.value = "";
	}
	// DOB
	if (birthVal()) {
		let dob = document.getElementById("updateBirth");
		await fetch(`${serverURL}dob`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ dob: new Date(dob.value) }),
		});
		document.getElementById("curBirth").innerHTML = dob.value;
		localStorage.setItem("curDOB", dob.value);
		dob.value = "";
	}
	// Zipcode
	if (zipVal()) {
		let zipcode = document.getElementById("updateZip");
		await fetch(`${serverURL}zipcode`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ zipcode: zipcode.value }),
		});
		document.getElementById("curZip").innerHTML = zipcode.value;
		localStorage.setItem("curZipcode", zipcode.value);
		zipcode.value = "";
	}
	// Password
	if (pwdVal()) {
		let password = document.getElementById("updatePwd");
		let retypePwd = document.getElementById("retypeUpdatePwd");
		const response = await fetch(`${serverURL}password`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
			body: JSON.stringify({ password: password.value }),
		});

		const resData = await response.json();
		document.getElementById("curPwd").innerHTML = "*".repeat(
			password.value.length
		);
		localStorage.setItem("curPwd", resData.password);
		password.value = "";
		retypePwd.value = "";
	}
};

const clearInput = () => {
	document.getElementById("updateDisName").value = "";
	document.getElementById("updateEmail").value = "";
	document.getElementById("updatePhone").value = "";
	document.getElementById("updateZip").value = "";
	document.getElementById("updateBirth").value = "";
	document.getElementById("updatePwd").value = "";
	document.getElementById("retypeUpdatePwd").value = "";
};

const UpdateProfile = () => {
	return (
		<Card className="updateGrid">
			<div></div>
			<div>
				<h1 className="updateTitle">Update</h1>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							disabled
							id="updateAccount"
							label="Account ID"
							value={localStorage.getItem("curUsername")}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							autoFocus
							fullWidth
							id="updateDisName"
							label="Update Display Name"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							id="updateEmail"
							label="Update Email Address"
							onChange={() => {
								let email =
									document.getElementById("updateEmail");
								email.setCustomValidity("");
								email.reportValidity();
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							id="updatePhone"
							label="Update Phone Number"
							onChange={() => {
								let phone =
									document.getElementById("updatePhone");
								phone.setCustomValidity("");
								phone.reportValidity();
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							id="updateBirth"
							type="date"
							onChange={() => {
								let birth =
									document.getElementById("updateBirth");
								birth.setCustomValidity("");
								birth.reportValidity();
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							fullWidth
							id="updateZip"
							label="Update Zipcode"
							onChange={() => {
								let zip = document.getElementById("updateZip");
								zip.setCustomValidity("");
								zip.reportValidity();
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="updatePwd"
							label="Update Password"
							type="password"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="retypeUpdatePwd"
							label="Retype Password"
							type="password"
							onChange={() => {
								let pwd =
									document.getElementById("retypeUpdatePwd");
								pwd.setCustomValidity("");
								pwd.reportValidity();
							}}
						/>
					</Grid>
				</Grid>
				<Grid>
					<Button
						fullWidth
						type="submit"
						variant="outlined"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
						onClick={() => {
							if (validate()) {
							}
						}}
					>
						Update
					</Button>
					<Button
						fullWidth
						type="clear"
						variant="outlined"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
						onClick={clearInput}
					>
						Clear
					</Button>
				</Grid>
			</div>
			<div></div>
		</Card>
	);
};

export default UpdateProfile;
