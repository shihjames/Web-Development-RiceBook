import "./Landing.css";
import Login from "./Login";
import Register from "./Register";
const serverURL = "https://ricebook-final-js.herokuapp.com/"

const Landing = () => {
	try {
		fetch(`${serverURL}users/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				localStorage.setItem("allusers", JSON.stringify(response));
			});
	} catch (err) {
		console.log(err);
	}

	return (
		<div className="landing">
			<h1 className="landingH1">RiceBook</h1>
			<h2 className="landingH2">Meet Your Rice Friends</h2>
			<img
				className="titleImg"
				src="https://i0.wp.com/owlspark.com/wp-content/uploads/2020/02/cropped-Rice_Owl_Flat_280_Blue-01.png?fit=512%2C512&ssl=1"
				alt="Rice Owls"
			/>
			<div className="loginBody">
				<Login></Login>
				<Register></Register>
			</div>
		</div>
	);
};

export default Landing;
